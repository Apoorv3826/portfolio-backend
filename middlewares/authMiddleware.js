import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized, token missing" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = await Admin.findById(decoded.id).select("-password");

        if (!req.admin) {
            return res.status(401).json({ message: "Not authorized, admin not found" });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed", error: error.message });
    }
};

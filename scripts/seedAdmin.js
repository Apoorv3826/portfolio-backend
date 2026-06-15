import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        const { MONGO_URI, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

        if (!MONGO_URI) {
            throw new Error("MONGO_URI is missing from .env");
        }

        if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
            throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD are required in .env");
        }

        await mongoose.connect(MONGO_URI);

        const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        await Admin.create({
            username: ADMIN_USERNAME,
            password: ADMIN_PASSWORD,
        });

        console.log("Admin created successfully");
    } catch (error) {
        console.error("Admin seed failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

seedAdmin();

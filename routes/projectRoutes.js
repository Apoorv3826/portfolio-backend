import express from "express";
import {
    createProject,
    deleteProject,
    getProject,
    getProjects,
    updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProjects).post(protect, createProject);
router.route("/:id").get(getProject).put(protect, updateProject).delete(protect, deleteProject);

export default router;

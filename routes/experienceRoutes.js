import express from "express";
import {
    createExperience,
    deleteExperience,
    getExperience,
    getExperiences,
    updateExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getExperiences).post(protect, createExperience);
router.route("/:id").get(getExperience).put(protect, updateExperience).delete(protect, deleteExperience);

export default router;

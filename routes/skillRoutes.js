import express from "express";
import {
    createSkill,
    deleteSkill,
    getSkill,
    getSkills,
    updateSkill,
} from "../controllers/skillController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getSkills).post(protect, createSkill);
router.route("/:id").get(getSkill).put(protect, updateSkill).delete(protect, deleteSkill);

export default router;

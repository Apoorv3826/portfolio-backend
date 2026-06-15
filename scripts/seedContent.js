import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { pathToFileURL } from "url";
import Experience from "../models/Experience.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";

dotenv.config();

const skillColors = [
    "#61dafb",
    "#68a063",
    "#f7df1e",
    "#47a248",
    "#f89820",
    "#3776ab",
    "#00758f",
    "#38bdf8",
    "#f05032",
    "#fcc624",
    "#2496ed",
    "#6db33f",
    "#e34f26",
    "#264de4",
];

const resolveFrontendDataPath = () => {
    return process.env.FRONTEND_DATA_PATH || "../apoorv-portfolio/src/data.js";
};

const seedContent = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from .env");
        }

        const dataUrl = pathToFileURL(path.resolve(resolveFrontendDataPath())).href;
        const { experienceData, projectsData, skillsData } = await import(dataUrl);

        await mongoose.connect(process.env.MONGO_URI);

        await Project.bulkWrite(
            projectsData.map((project) => ({
                updateOne: {
                    filter: { title: project.title },
                    update: {
                        $set: {
                            num: project.num,
                            title: project.title,
                            description: project.description,
                            github: project.github,
                            live: project.live,
                        },
                    },
                    upsert: true,
                },
            })),
        );

        await Skill.bulkWrite(
            skillsData.map((skill, index) => ({
                updateOne: {
                    filter: { name: skill.name },
                    update: {
                        $set: {
                            name: skill.name,
                            color: skill.color || skillColors[index % skillColors.length],
                        },
                    },
                    upsert: true,
                },
            })),
        );

        await Experience.bulkWrite(
            experienceData.map((experience) => ({
                updateOne: {
                    filter: { role: experience.role, company: experience.company },
                    update: {
                        $set: {
                            role: experience.role,
                            company: experience.company,
                            period: experience.period,
                            points: experience.points,
                            tags: experience.tags,
                        },
                    },
                    upsert: true,
                },
            })),
        );

        console.log("Portfolio content seeded successfully");
    } catch (error) {
        console.error("Content seed failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

seedContent();

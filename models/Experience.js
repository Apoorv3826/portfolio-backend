import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        role: { type: String, required: true },
        company: { type: String, required: true },
        period: { type: String, required: true },
        points: [{ type: String }],
        tags: [{ type: String }],
    },
    { timestamps: true },
);

export default mongoose.model("Experience", experienceSchema);

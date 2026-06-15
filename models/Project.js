import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        num: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        github: { type: String, required: true },
        live: { type: String, default: null },
    },
    { timestamps: true },
);

export default mongoose.model("Project", projectSchema);

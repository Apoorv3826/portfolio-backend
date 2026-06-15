import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        color: { type: String, required: true },
        icon: { type: String, required: true, default: "Code2" },
        iconProvider: {
            type: String,
            enum: ["simple-icons", "lucide"],
            default: "lucide",
        },
    },
    { timestamps: true },
);

export default mongoose.model("Skill", skillSchema);

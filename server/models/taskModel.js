import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    task: {
        type: String
    },
    toAssign: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const taskModel = mongoose.model("Tasks", taskSchema);
export default taskModel;
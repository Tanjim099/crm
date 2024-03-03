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
    toAssigned: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    taskList: [],
    images: [
        {
            public_id: String,
            secure_url: String
        }
    ]
}, { timestamps: true });

const taskModel = mongoose.model("Tasks", taskSchema);
export default taskModel;
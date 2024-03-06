import mongoose from "mongoose";
const reminderSchema = new mongoose({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
    },
    reminderTime: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

const reminderModel = mongoose.model("Reminder", reminderSchema);
export default reminderModel;
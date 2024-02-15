import mongoose, { Schema } from "mongoose";

const leaveSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    responsed: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Okay", "Not"]
    }
});

const leaveModel = mongoose.model("Leaves", leaveSchema);
export default leaveModel;
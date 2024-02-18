import mongoose, { Schema } from "mongoose";

const userShcema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Sales-executive",
        enum: ["Admin", "Hr", "Manager", "Team-Leader", "Sales-executive", "Intern"]
    },
    salary: {
        type: Number,
    },
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "Deactive"]
    }
}, { timestamps: true });

const userModel = mongoose.model("Users", userShcema);
export default userModel;
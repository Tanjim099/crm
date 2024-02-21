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
        enum: ["Admin", "Hr", "Manager", "Team-Leader", "Sales Executive", "Intern"]
    },
    salary: {
        type: Number,
    },
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "Deactive"]
    },
    linkedin: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    },
    github: {
        type: String
    },
}, { timestamps: true });

const userModel = mongoose.model("Users", userShcema);
export default userModel;
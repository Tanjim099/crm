import mongoose, { Schema } from "mongoose";

const authSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Admin",
        enum: ["Admin"]
    }
})

const authModel = mongoose.model("Auth", authSchema);
export default authModel;
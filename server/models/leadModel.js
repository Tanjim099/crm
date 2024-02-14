import mongoose, { Schema } from "mongoose";
import sendEmail from "../utils/sendEmail.js";
import { leadTemplate } from "../mail/leadTemplate.js";
const leadSchema = new Schema({
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
    projectName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Not Responed", "Done"]
    },
    assingTo: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    }
}, { timestamps: true });

async function sendEmailLead(email, name, phone, projectName) {
    try {
        const mailResponse = await sendEmail(email, "Lead", leadTemplate(name, email, phone, projectName))
    } catch (error) {
        console.log(error);
        throw new error;
    }
};

leadSchema.pre("save", async function (next) {
    if (this.isNew) {
        await sendEmailLead(this.email, this.name, this.phone, this.projectName)
    }
    next();
})

const leadModel = mongoose.model("Lead", leadSchema);
export default leadModel;
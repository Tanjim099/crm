import reminderModel from "../models/reminderModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const addReminder = async (req, res, next) => {
    const { name, email, phone, message, reminderTime, user } = req.body;
    if (!name || !email || !phone || !reminderTime) {
        return next(new ApiError(400, "All fileds are required"))
    }
    try {
        const reminder = await reminderModel.create({
            name,
            email,
            phone,
            message,
            reminderTime,
            user

        });

        res.status(201).json(
            new ApiResponse(200, reminder, "New Remider Added Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to add new reminder"));
    }
};

export const getAllReminder = async (req, res, next) => {
    try {
        const reminders = await reminderModel.find().populate("user");
        res.status(201).json(
            new ApiResponse(200, reminders, "Reminder Fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Fetch reminders"));
    }
}
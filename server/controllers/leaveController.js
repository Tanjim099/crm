import leaveModel from "../models/leaveModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
export const createLeave = async (req, res, next) => {
    // console.log(req.body)
    const { user, subject, message, from, to } = req.body;
    if (!user || !subject || !message || !from || !to) {
        return next(new ApiError(400, "all Fields are required"))
    }
    try {
        const leave = await leaveModel.create({
            user,
            subject,
            message,
            from,
            to
        })

        res.status(201).json(
            new ApiResponse(200, leave, "Leave Applied Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to applied leave"))
    }
};

export const getAllLeaves = async (req, res, next) => {
    try {
        const leaves = await leaveModel.find({}).populate("user").sort({ createdAt: -1 });
        if (!leaves) {
            return next(new ApiError(402, "Leaves is not available"));
        };

        res.status(201).json(
            new ApiResponse(200, leaves, "Leaves fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched leaves"));
    }
};

export const getLeaveDataByUserID = async (req, res, next) => {
    const { uid } = req.params;
    if (!uid) {
        return next(new ApiError(400, "Unauthenticated, please login"));
    }
    try {
        const leaves = await leaveModel.find({ "user": uid }).populate("user").sort({ createdAt: -1 });
        if (!leaves) {
            return next(new ApiError(402, "Leaves is not available"));
        };
        res.status(201).json(
            new ApiResponse(200, leaves, "Leaves fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched leaves"));
    }
};
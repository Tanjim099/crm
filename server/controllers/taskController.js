import taskModel from "../models/taskModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const createTask = async (req, res, next) => {
    const { title, description, task, toAssign } = req.body;
    try {
        const newTask = await taskModel.create({
            title,
            description,
            task,
            toAssign
        });


        res.status(201).json(
            new ApiResponse(200, newTask, "Task Created Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to create task"))
    }
};


export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskModel.find();
        res.status(201).json(
            new ApiResponse(200, tasks, "Task Tasks data fetched successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched tasks data"))
    }
}
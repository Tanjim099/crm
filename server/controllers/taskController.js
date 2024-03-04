import taskModel from "../models/taskModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import uploadCloudinary from "../utils/cloudinary.js"

export const createTask = async (req, res, next) => {
    const { title, description, task, toAssigned, taskList } = req.body;
    console.log(req.body);
    // console.log(req.files)
    try {
        const newTask = await taskModel.create({
            title,
            description,
            task,
            toAssigned,
            taskList
        });
        if (req.files) {
            try {
                const images = req.files.images;
                const imagesResult = await Promise.all(
                    images.map((file) => uploadCloudinary(file.path))
                )
                newTask.images = newTask.images.concat(imagesResult.map((result) => ({
                    public_id: result.public_id || "",
                    secure_url: result.secure_url
                })))
            } catch (error) {
                console.log("error0", error);
                return next(new ApiError(501, "error.message"))
            }
        }
        await newTask.save()
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
        const tasks = await taskModel.find().populate("toAssigned").sort({ createdAt: -1 });
        res.status(201).json(
            new ApiResponse(200, tasks, "Tasks data fetched successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched tasks data"))
    }
}

export const getTaskByToAssignedId = async (req, res, next) => {
    const { uid } = req.params;
    if (!uid) {
        return next(new ApiError(401, "You haven't any task"));
    }
    try {
        const tasks = await taskModel.find({ toAssigned: uid }).populate("toAssigned")
        res.status(201).json(
            new ApiResponse(200, tasks, "Tasks fetched successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched tasks"))
    }
}

export const deleteTask = async (req, res, next) => {
    const { tid } = req.params;
    if (!tid) {
        return next(new ApiError(401, "Something went wrong please try again"));
    }
    try {
        await taskModel.findByIdAndDelete(tid);
        res.status(201).json(
            new ApiResponse(200, "Task deleted successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to delete task"))
    }
}
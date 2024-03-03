import { Router } from "express";
import { createTask, deleteTask, getAllTasks } from "../controllers/taskController.js";
import upload from "../middlewares/multerMiddleware.js"

const taskRoutes = Router();
taskRoutes.post("/create", upload.fields([{ name: "images", maxCount: 10 }]), createTask);
taskRoutes.get("/get-all", getAllTasks);
taskRoutes.delete("/delete/:tid", deleteTask);

export default taskRoutes;

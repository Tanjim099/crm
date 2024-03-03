import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/taskController.js";
import upload from "../middlewares/multerMiddleware.js"

const taskRoutes = Router();
taskRoutes.post("/create", upload.fields([{ name: "images", maxCount: 10 }]), createTask);
taskRoutes.get("/get-all", getAllTasks);

export default taskRoutes;

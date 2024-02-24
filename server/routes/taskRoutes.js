import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/taskController.js";

const taskRoutes = Router();
taskRoutes.post("/create", createTask);
taskRoutes.get("/get-all", getAllTasks);

export default taskRoutes;

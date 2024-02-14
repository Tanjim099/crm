import { Router } from "express";
import { createLeave } from "../controllers/leaveController.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply", createLeave);

export default leaveRoutes;
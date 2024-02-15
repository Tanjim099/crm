import { Router } from "express";
import { createLeave, getAllLeaves } from "../controllers/leaveController.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply", createLeave);
leaveRoutes.get("/get-all", getAllLeaves);

export default leaveRoutes;
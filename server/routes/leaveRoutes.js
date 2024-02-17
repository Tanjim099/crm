import { Router } from "express";
import { createLeave, getAllLeaves, getLeaveDataByUserID } from "../controllers/leaveController.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply", createLeave);
leaveRoutes.get("/get-all", getAllLeaves);
leaveRoutes.get("/get/user/:uid", getLeaveDataByUserID);

export default leaveRoutes;
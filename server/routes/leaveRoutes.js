import { Router } from "express";
import { createLeave, getAllLeaves, getLeaveDataByUserID, updateLeave } from "../controllers/leaveController.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply", createLeave);
leaveRoutes.get("/get-all", getAllLeaves);
leaveRoutes.get("/get/user/:uid", getLeaveDataByUserID);
leaveRoutes.put("/update/:lid", updateLeave);

export default leaveRoutes;
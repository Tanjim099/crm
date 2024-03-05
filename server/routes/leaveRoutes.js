import { Router } from "express";
import { createLeave, deleteLeave, getAllLeaves, getLeaveDataByUserID, updateLeave, updateLeaveResponse } from "../controllers/leaveController.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply", createLeave);
leaveRoutes.get("/get-all", getAllLeaves);
leaveRoutes.get("/get/user/:uid", getLeaveDataByUserID);
leaveRoutes.put("/update/:lid", updateLeave);
leaveRoutes.put("/update-response/:lid", updateLeaveResponse);
leaveRoutes.delete("/delete/:lid", deleteLeave);

export default leaveRoutes;
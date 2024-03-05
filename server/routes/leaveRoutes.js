import { Router } from "express";
import { createLeave, deleteLeave, getAllLeaves, getLeaveDataByUserID, updateLeave } from "../controllers/leaveController.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply", createLeave);
leaveRoutes.get("/get-all", getAllLeaves);
leaveRoutes.get("/get/user/:uid", getLeaveDataByUserID);
leaveRoutes.put("/update/:lid", updateLeave);
leaveRoutes.delete("/delete/:lid", deleteLeave);

export default leaveRoutes;
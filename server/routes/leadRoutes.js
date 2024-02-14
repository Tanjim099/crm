import { Router } from "express";
import { createLead, getAllLeads, getLeadsByUserId, updateLead, updateLeadAssign, updateLeadStatus } from "../controllers/leadController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";

const leadRoutes = Router();

leadRoutes.post("/submit", createLead);
leadRoutes.get("/get-all", isAdmin, getAllLeads);
leadRoutes.put("/update/:lid", updateLead);
leadRoutes.put("/update-status/:lid", updateLeadStatus);
leadRoutes.put("/update-assign", updateLeadAssign);
leadRoutes.get("/get/user/:uid", getLeadsByUserId);

export default leadRoutes;
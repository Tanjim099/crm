import { Router } from "express";
import { createLead, deleteLead, filterByDate, filterByProjectName, filterByStatus, getAllLeads, getLead, getLeadsByUserId, updateLead, updateLeadAssign, updateLeadStatus } from "../controllers/leadController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import { isUserLoggedIn } from "../middlewares/userMiddleware.js";

const leadRoutes = Router();

leadRoutes.post("/submit", createLead);
leadRoutes.get("/get-all", getAllLeads);
leadRoutes.get("/get/:lid", getLead);
leadRoutes.put("/update/:lid", updateLead);
leadRoutes.put("/update-status/:lid", updateLeadStatus);
leadRoutes.put("/update-assign", updateLeadAssign);
leadRoutes.get("/get/user/:uid", getLeadsByUserId);
leadRoutes.get("/filter/by-projectname", filterByProjectName);
leadRoutes.get("/filter/by-status", filterByStatus);
leadRoutes.get("/filter/by-date", filterByDate);
leadRoutes.delete("/delete/:lid", isUserLoggedIn, deleteLead);
export default leadRoutes;
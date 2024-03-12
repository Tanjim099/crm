import { Router } from "express";
import { addReminder, getAllReminder } from "../controllers/reminderController.js";
const remiderRoutes = Router();

remiderRoutes.post("/add", addReminder);
remiderRoutes.get("/", getAllReminder);

export default remiderRoutes;
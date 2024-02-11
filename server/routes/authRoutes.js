import { Router } from "express";
import { getAuthProfile, login, register } from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const authRoutes = Router();
authRoutes.post("/register", register);
authRoutes.post("/admin-login", login);
authRoutes.get("/profile/:authid", isLoggedIn, getAuthProfile);
export default authRoutes;
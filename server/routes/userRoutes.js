import { Router } from "express";
import { getAllUsers, getUserProfile, userLogin, userRegister } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const userRoutes = Router();

userRoutes.post("/add", userRegister);
userRoutes.post("/employee-login", userLogin);
userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/profile/:userid", getUserProfile);

export default userRoutes
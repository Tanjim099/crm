import { Router } from "express";
import { getAllUsers, getUserProfile, userLogin, userLogout, userRegister } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isUserLoggedIn } from "../middlewares/userMiddleware.js";

const userRoutes = Router();

userRoutes.post("/add", userRegister);
userRoutes.post("/employee-login", userLogin);
userRoutes.get("/user-logout", userLogout);
userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/profile/:userid", isUserLoggedIn, getUserProfile);

export default userRoutes
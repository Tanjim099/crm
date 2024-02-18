import { Router } from "express";
import { getAllUsers, getUserProfile, userDelete, userLogin, userLogout, userRegister, userUpdate } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isUserLoggedIn } from "../middlewares/userMiddleware.js";

const userRoutes = Router();

userRoutes.post("/add", userRegister);
userRoutes.post("/employee-login", userLogin);
userRoutes.get("/user-logout", userLogout);
userRoutes.get("/get-all", isUserLoggedIn, getAllUsers);
userRoutes.get("/profile/:userid", isUserLoggedIn, getUserProfile);
userRoutes.put("/update/:uid", isUserLoggedIn, userUpdate);
userRoutes.delete("/delete/:uid", isUserLoggedIn, userDelete);

export default userRoutes
import { Router } from "express";
import { getAllUsers, getUserProfile, userLogin, userLogout, userRegister, userUpdate } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isUserLoggedIn } from "../middlewares/userMiddleware.js";

const userRoutes = Router();

userRoutes.post("/add", userRegister);
userRoutes.post("/employee-login", userLogin);
userRoutes.get("/user-logout", userLogout);
userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/profile/:userid", getUserProfile);
userRoutes.put("/update/:uid", userUpdate);

export default userRoutes
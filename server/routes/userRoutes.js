import { Router } from "express";
import { adminuserUpdate, getAllUsers, getUserProfile, updateUserProfile, userDelete, userLogin, userLogout, userRegister } from "../controllers/userController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import { isUserLoggedIn } from "../middlewares/userMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const userRoutes = Router();

userRoutes.post("/add", userRegister);
userRoutes.post("/employee-login", userLogin);
userRoutes.get("/user-logout", userLogout);
userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/profile/:userid", isUserLoggedIn, getUserProfile);
userRoutes.put("/admin/update/:uid", isUserLoggedIn, adminuserUpdate);
userRoutes.put("/update/:uid", upload.single("avatar"), isUserLoggedIn, updateUserProfile);
userRoutes.delete("/delete/:uid", isUserLoggedIn, userDelete);

export default userRoutes
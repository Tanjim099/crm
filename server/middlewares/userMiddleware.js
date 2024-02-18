
import Jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import userModel from "../models/userModel.js";
import authModel from "../models/authModel.js";
export const isUserLoggedIn = async (req, res, next) => {
    const userToken = req.cookies.token;
    const authToken = req.cookies.token;
    if (!userToken) {
        return next(new ApiError(400, "Unauthenticated, please login"))
    }

    try {
        const userDecode = Jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await userModel.findById(userDecode.userId);
        const authDecode = Jwt.verify(authToken, process.env.JWT_SECRET);
        const auth = await authModel.findById(authDecode.userId);
        if (!auth && !user) {
            return next(new ApiError(401, "Unauthenticated, please login"))
        }
        req.user == user || req.user == auth
        next();
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to login", error));
    }
}
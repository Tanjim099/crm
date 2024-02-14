
import Jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import userModel from "../models/userModel.js";
export const isUserLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ApiError(400, "Unauthenticated, please login"))
    }

    try {
        const decode = Jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.userId);
        if (!user) {
            return next(new ApiError(401, "Unauthenticated, please login"))
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to login", error));
    }
}
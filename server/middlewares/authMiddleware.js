
import Jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import authModel from "../models/authModel.js";
export const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ApiError(400, "Unauthenticated, please login"))
    }

    try {
        const decode = Jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decode", decode);
        const user = await authModel.findById(decode.userId);
        // console.log("user", user)
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


export const isAdmin = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ApiError(400, "Unauthenticated, please login"));
    }

    try {
        const decode = Jwt.verify(token, process.env.JWT_SECRET);
        const auth = await authModel.findById(decode.userId);
        if (!auth) {
            return next(new ApiError(401, "Unauthenticated, please login"))
        }
        if (auth.role !== "Admin") {
            return next(new ApiError(400, "Unauthorized Access"));
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Error", error));
    }
}
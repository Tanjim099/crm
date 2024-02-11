import { comparePassword, hashPassword } from "../helper/authHelper.js";
import authModel from "../models/authModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        // console.log(req.body);
        console.log("getting requiset");
        if (!name || !email || !password) {
            return next(new ApiError(400, "all Fields are required"))
        }

        const userExists = await authModel.findOne({ email });
        if (userExists) {
            return next(new ApiError(400, "Email already exist"));
        }
        const hashedPassword = await hashPassword(password)
        const auth = await authModel.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json(
            new ApiResponse(200, auth, "Register Successfully")
        )

    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to register", error));
    }

}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ApiError(400, "all Fields are required"))
        }

        const userExists = await authModel.findOne({ email });
        console.log(userExists.password);
        if (!userExists) {
            return next(new ApiError(400, "Email already exist"));
        }

        const isValidPassword = await comparePassword(password, userExists.password);
        if (!isValidPassword) {
            return next(new ApiError(401, "Invalid email or password"));
        }

        //Generate JWT token
        const token = Jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { httpOnly: false });
        const data = {
            user: userExists,
            token
        }

        res.status(201).json(
            new ApiResponse(200, data, "Login Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to login", error));
    }
}


export const getAuthProfile = async (req, res, next) => {
    try {
        const { authid } = req.params;
        if (!authid) {
            return next(new ApiError(401, "Something went wrong"))
        };

        const auth = await authModel.findById(authid);
        res.status(201).json(
            new ApiResponse(200, auth, "Auth Profile Fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to login", error));
    }
}
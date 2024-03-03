import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Jwt from "jsonwebtoken";
import uploadCloudinary from "../utils/cloudinary.js";

export const userRegister = async (req, res, next) => {
    const { name, email, phone, password, role, salary } = req.body;
    if (!name || !email || !phone || !password) {
        return next(new ApiError(400, "all Fields are required"))
    }
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return next(new ApiError(400, "Email already exist"));
        }
        const hashedPassword = await hashPassword(password)
        const user = await userModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            salary
        })

        res.status(201).json(
            new ApiResponse(200, user, "Register Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to register", error));
    }
}


export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ApiError(400, "all Fields are required"))
        }

        const userExists = await userModel.findOne({ email });
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


export const userLogout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            secure: true,
            maxAge: 0,
            httpOnly: true
        });
        res.status(201).json(
            new ApiResponse(200, null, "Logout Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Logout", error));
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        const { userid } = req.params;
        if (!userid) {
            return next(new ApiError(401, "Something went wrong"))
        };

        const user = await userModel.findById(userid);
        res.status(201).json(
            new ApiResponse(200, user, "User Profile Fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to login", error));
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find().sort({ createdAt: -1 });
        res.status(201).json(
            new ApiResponse(200, users, "Users Fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Fetched", error));
    }
}

export const updateUserProfile = async (req, res, next) => {
    const { uid } = req.params;
    if (!uid) {
        return next(new ApiError(501, "User Not Login"));
    };
    const { name, email, phone, linkedin, instagram, facebook, github } = req.body;
    console.log(req.body)
    console.log(req.file)
    try {
        const user = await userModel.findById(uid);
        if (!user) {
            return next(new ApiError(501, "User Not found please try again"));
        }
        const updatedUser = await userModel.findByIdAndUpdate(uid, {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            linkedin: linkedin || user.linkedin,
            instagram: instagram || user.instagram,
            facebook: facebook || user.facebook,
            github: github || user.github,
            avatar: {

            }
        });

        if (req.file) {
            const avatarLocalPath = req.file.path;
            if (!avatarLocalPath) {
                next(new ApiError(400, "Avatar file is required"));
            }
            const avatar = await uploadCloudinary(avatarLocalPath);
            if (!avatar) {
                next(new ApiError(400, "Avatar file is required"));
            }


            updatedUser.avatar.public_id = avatar.public_id || "DUMMY"
            updatedUser.avatar.secure_url = avatar.secure_url || "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
        }

        await updatedUser.save();
        res.status(201).json(
            new ApiResponse(200, updatedUser, "User updated successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to update user"))
    }
}

export const adminuserUpdate = async (req, res, next) => {
    const { uid } = req.params;
    const { name, email, phone, password, role, status, salary } = req.body;
    if (!uid) {
        return next(new ApiError(501, "User Not Found", error));
    }
    try {
        const user = await userModel.findById(uid)
        const updatedUser = await userModel.findByIdAndUpdate(uid, {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            role: role || user.role,
            status: status || user.status,
            salary: salary || salary

        }, { new: true });

        res.status(201).json(
            new ApiResponse(200, updatedUser, "User Updated Successfully")
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Fetched", error));
    }

}

export const userDelete = async (req, res, next) => {
    const { uid } = req.params;
    if (!uid) {
        return next(new ApiError(501, "User Not Found", error));
    }
    try {
        await userModel.findByIdAndDelete(uid);
        res.status(201).json(
            new ApiResponse(200, "User Deleted Successfully")
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Fetched", error));
    }
}
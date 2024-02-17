import leadModel from "../models/leadModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
export const createLead = async (req, res, next) => {
    const { name, email, phone, projectName, status, assingTo } = req.body;
    if (!name || !email || !phone || !projectName) {
        return next(new ApiError(400, "all Fields are required"));
    };

    try {
        const lead = await leadModel.create({
            name,
            email,
            phone,
            projectName,
            status,
            assingTo
        });

        res.status(201).json(
            new ApiResponse(200, lead, "Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Submit"))
    }
};

export const getAllLeads = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const leads = await leadModel.find({}).populate("assingTo").skip(skip).limit(limit).sort({ createdAt: -1 });
        res.status(201).json(
            new ApiResponse(200, leads, "Fetched Leads Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched leads"))
    }
}


export const getLeadsByUserId = async (req, res, next) => {
    const { uid } = req.params;
    if (!uid) {
        return next(new ApiError(401, "Unauthorized access"));
    }
    try {
        const leads = await leadModel.find({ assingTo: uid });
        if (!leads) {
            return next(new ApiError(401, "You haven't any lead"));
        }
        res.status(201).json(
            new ApiResponse(200, leads, "Leads Fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched leads"))
    }
}

export const updateLead = async (req, res, next) => {
    const { lid } = req.params;
    const { status, assingTo } = req.body;

    try {
        const lead = await leadModel.findByIdAndUpdate(lid, {
            status,
            assingTo
        }, { new: true });

        res.status(201).json(
            new ApiResponse(200, lead, "Leads Updated Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Updated leads"))
    }
}

export const updateLeadStatus = async (req, res, next) => {
    const { lid } = req.params;
    const { status } = req.body;
    try {
        const lead = await leadModel.findByIdAndUpdate(lid, {
            status: status
        }, { new: true });

        res.status(201).json(
            new ApiResponse(200, lead, "Leads Status Updated Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Updated leads Status"))
    }
}

export const updateLeadAssign = async (req, res, next) => {
    // const { lid } = req.params;
    const { leadIds, newAssingTo } = req.body;
    try {
        const lead = await leadModel.updateMany({ _id: { $in: leadIds } }, { assingTo: newAssingTo });

        res.status(201).json(
            new ApiResponse(200, lead, "Leads Assign Updated Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to Updated leads Assign"))
    }
}
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
        const leads = await leadModel.find({ assingTo: uid }).populate("assingTo");
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


export const filterByProjectName = async (req, res, next) => {
    const { projectName } = req.query;
    console.log(req.query)
    try {
        const leads = await leadModel.find({ projectName }).populate("assingTo");
        res.status(201).json(
            new ApiResponse(200, leads, "Leads filter Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to filter"))
    }
}

export const filterByStatus = async (req, res, next) => {
    const { status } = req.query;
    try {
        const leads = await leadModel.find({ status }).populate("assingTo");
        res.status(201).json(
            new ApiResponse(200, leads, "Leads filter Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to filter"))
    }
};

export const filterByDate = async (req, res, next) => {
    const { date } = req.query;
    console.log("createdAt", date)

    try {
        let filter = {};

        // Parse createdAt string to Date object if applicable
        if (date) {
            filter.date = new Date(date);
        }
        console.log(filter)
        // Query leads based on filter criteria
        const leads = await leadModel.find(filter).populate("assingTo");
        console.log(leads)
        // Return filtered leads
        res.status(200).json(
            new ApiResponse(200, leads, "Leads filtered successfully")
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to filter leads"));
    }
}


export const deleteLead = async (req, res, next) => {
    const { lid } = req.params;
    if (!lid) {
        return next(new ApiError(401, "Lead not available"));
    }
    try {
        await leadModel.findByIdAndDelete(lid);
        res.status(201).json(
            new ApiResponse(200, "Lead Deleted Successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to delete leads try again"))
    }
}
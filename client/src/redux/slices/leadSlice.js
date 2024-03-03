import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    leads: [],
    filteredLeads: []
};

export const getAllLeads = createAsyncThunk("/get-all/leads", async (data) => {
    try {
        const res = axiosInstance.get(`lead/get-all?page=${data.page}&limit=${data.limit}`);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

export const getLeadsByUserId = createAsyncThunk("/get-leads/byuserid", async (uid) => {
    try {
        const res = axiosInstance.get(`lead/get/user/${uid}`);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})


export const updateLead = createAsyncThunk("/update", async (data) => {
    try {
        const res = axiosInstance.get(`lead/update/${data[0]}`, data[1]);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

export const updateLeadStatus = createAsyncThunk("/update-status", async (data) => {
    try {
        const res = axiosInstance.put(`lead/update-status/${data[0]}`, { status: data[1] });
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

export const updateLeadAssign = createAsyncThunk("/update-assign", async (data) => {
    try {
        const res = axiosInstance.put("lead/update-assign", { leadIds: data[0], newAssingTo: data[1] });
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
});


export const filterByProjectName = createAsyncThunk("/filter/byprojectname", async (query) => {
    try {
        const res = axiosInstance.get(`lead/filter/by-projectname?projectName=${query}`);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

export const filterByStatus = createAsyncThunk("/filter/bystatus", async (query) => {
    try {
        const res = axiosInstance.get(`lead/filter/by-status?status=${query}`);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})


export const filterByDate = createAsyncThunk("/filter/bydate", async (query) => {
    try {
        const res = axiosInstance.get(`lead/filter/by-date?date=${query}`);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

export const deleteLead = createAsyncThunk("/delete", async (lid) => {
    try {
        const res = axiosInstance.delete(`lead/delete/${lid}`);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLeads.fulfilled, (state, action) => {
                // console.log(action);
                state.leads = action?.payload?.data;
            })
            .addCase(filterByProjectName.fulfilled, (state, action) => {
                state.filteredLeads = action?.payload?.data;
                // console.log(action);
            })
            .addCase(filterByStatus.fulfilled, (state, action) => {
                state.filteredLeads = action?.payload?.data;
                // console.log(action);
            })
            .addCase(filterByDate.fulfilled, (state, action) => {
                state.filteredLeads = action?.payload?.data;
                // console.log(action);
            })
    }
})

export default leadSlice.reducer;
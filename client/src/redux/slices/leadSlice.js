import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    leads: []
};

export const getAllLeads = createAsyncThunk("/get-all/leads", async () => {
    try {
        const res = axiosInstance.get("lead/get-all");
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
})

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLeads.fulfilled, (state, action) => {
                console.log(action);
                state.leads = action?.payload?.data;
            })
    }
})

export default leadSlice.reducer;
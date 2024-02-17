import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    leaveData: []
};


export const ApplyLeave = createAsyncThunk("/apply", async (data) => {
    try {
        const res = axiosInstance.post("leave/apply", data);
        return (await res).data
    } catch (error) {
        console.log(error);
    }
});

export const getAllLeaves = createAsyncThunk("/get-all", async () => {
    try {
        const res = axiosInstance.get("leave/get-all");
        return (await res).data;
    } catch (error) {
        console.log(error);
    }
})

export const getLeaveDataByUserID = createAsyncThunk("/get/by-userid", async (uid) => {
    try {
        const res = axiosInstance.get(`leave/get/user/${uid}`);
        return (await res).data;
    } catch (error) {
        console.log(error);
    }
})

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLeaves.fulfilled, (state, action) => {
                console.log(action);
                state.leaveData = action?.payload?.data;
            })
            .addCase(getLeaveDataByUserID.fulfilled, (state, action) => {
                console.log(action);
                state.leaveData = action?.payload?.data;
            })
    }
});

export default leaveSlice.reducer;
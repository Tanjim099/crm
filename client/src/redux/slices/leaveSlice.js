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

export const updateLeave = createAsyncThunk("/update", async (data) => {
    try {
        const res = axiosInstance.put(`leave/update/${data[0]}`, data[1]);
        return (await res).data;
    } catch (error) {
        console.log(error);
    }
})

export const updateLeaveResponse = createAsyncThunk("/update-response", async (data) => {
    try {
        // console.log(data)
        const res = axiosInstance.put(`leave/update-response/${data[0]}`, { responsed: data[1] });
        return (await res).data;
    } catch (error) {
        console.log(error);
    }
})

export const deleteLeave = createAsyncThunk("/delete", async (lid) => {
    try {
        const res = axiosInstance.delete(`leave/delete/${lid}`,);
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
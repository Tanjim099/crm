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

    }
})

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {},
    extraReducers: () => { }
});

export default leaveSlice.reducer;
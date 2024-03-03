import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    taskData: []
};

export const createTask = createAsyncThunk("/create", async (data) => {
    try {
        const res = axiosInstance.post("task/create", data);
        return (await res).data;
    } catch (error) {
        console.log(error)
    }
});

export const getAllTasks = createAsyncThunk("/get", async () => {
    try {
        const res = axiosInstance.get("task/get-all");
        return (await res).data;
    } catch (error) {
        console.log(error)
    }
})

export const getTasksByUserId = createAsyncThunk("/get-byuserid", async (uid) => {
    try {
        const res = axiosInstance.get(`task/get-byuserid/${uid}`);
        return (await res).data;
    } catch (error) {
        console.log(error)
    }
})

export const deleteTask = createAsyncThunk("/delete", async (tid) => {
    try {
        const res = axiosInstance.delete(`task/delete/${tid}`);
        return (await res).data;
    } catch (error) {
        console.log(error)
    }
})

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.taskData = action?.payload?.data;
            })
            .addCase(getTasksByUserId.fulfilled, (state, action) => {
                state.taskData = action?.payload?.data;
            })
    }
});

export default taskSlice.reducer;
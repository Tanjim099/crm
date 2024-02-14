import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem('isLoggedIn')) : false,
    userId: localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId')) : "",
    userData: [],
    allUserData: []
};

export const addUser = createAsyncThunk("/add", async (data) => {
    try {
        const res = axiosInstance.post("/user/add", data);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
});


export const userLogin = createAsyncThunk("/user-login", async (data) => {
    try {
        const res = axiosInstance.post("/user/employee-login", data);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
});


export const userLogout = createAsyncThunk("/user-logout", async () => {
    try {
        const res = axiosInstance.get("/user/user-logout");
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})


export const getUserProfile = createAsyncThunk("/get-user-profile", async (userid) => {
    console.log(userid);
    try {
        const res = axiosInstance.get(`/user/profile/${userid}`);
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

export const getAllUsers = createAsyncThunk("/get-all", async () => {
    try {
        const res = axiosInstance.get("/user/get-all");
        return (await res).data;
    } catch (error) {
        console.log(error.message)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                // console.log(action)
                state.allUserData = action?.payload?.data;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                // console.log(action)
                state.isLoggedIn = localStorage.setItem("isLoggedIn", JSON.stringify(true)) || false;
                state.userId = localStorage.setItem("userId", JSON.stringify(action?.payload?.data?.user?._id) || null);
            })
            .addCase(userLogout.fulfilled, (state, action) => {
                // console.log(action)
                state.isLoggedIn = localStorage.removeItem("isLoggedIn") || false;
                state.userId = localStorage.removeItem("userId") || null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                // console.log(action);
                state.userData = action?.payload?.data;
            })
    }
});

export default userSlice.reducer;
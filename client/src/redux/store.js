import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import leadSlice from "./slices/leadSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        lead: leadSlice
    },
    devTools: true
});

export default store;
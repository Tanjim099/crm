import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAuthProfile } from '../../redux/slices/authSlice';
import { getUserProfile } from '../../redux/slices/userSlice';

function RequireAuth({ allowedRoles }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [authData, setAuthData] = useState(null)
    console.log(authData)
    const getAuthId = localStorage.getItem("authId");
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    const authId = JSON.parse(getAuthId)
    console.log("authId", authId)
    const { userData } = useSelector((state) => state.user);
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId)
    async function fetchAuthData() {
        const res = await dispatch(getAuthProfile(authId))
        const data = res?.payload?.data?.role;
        console.log(data);
        setAuthData(data);
    }

    async function fetchUserData() {
        await dispatch(getUserProfile(userId))
    }

    useEffect(() => {
        fetchAuthData();
        // if (authId) {
        //     fetchAuthData();
        // }
        // else if (userId) {
        //     console.log("yes1")
        //     fetchUserData()
        // }
    }, [authId, userId])
    console.log("authData.role", auth);
    console.log("userData.role", userData.role)
    console.log("allowedRoles", allowedRoles)
    return isLoggedIn && allowedRoles.find((myRole) => {
        // console.log(myRole == authData.role)
        return myRole == "YEs"
    }) ? (
        <Outlet />
    ) : isLoggedIn ? (<Navigate to="/denied" />) : (<Navigate to="/employee-login" />)
}

export default RequireAuth
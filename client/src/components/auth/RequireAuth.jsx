import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAuthProfile } from '../../redux/slices/authSlice';
import { getUserProfile } from '../../redux/slices/userSlice';
import useGetProfile from '../../hooks/useGetProfile';

function RequireAuth({ allowedRoles }) {
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId)
    // console.log(userId)

    const userData = useGetProfile(userId);
    console.log(userData);
    return userData && allowedRoles.find((myRole) => myRole == userData?.role) ? (
        <Outlet />
    ) : userData ? (<Navigate to="/denied" />) : (<Navigate to="/user-login" />)
}
export default RequireAuth
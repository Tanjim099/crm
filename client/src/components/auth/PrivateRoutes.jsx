import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useGetProfile from '../../hooks/useGetProfile';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/slices/userSlice';

function PrivateRoutes({ allowedRoles }) {
    const dispatch = useDispatch();
    console.log(allowedRoles)
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId);
    console.log(userId);
    const { userData, loading, error } = useGetProfile(userId);
    console.log(userData)
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState(null)

    async function fetchUserData() {
        setIsLoading(true)
        const res = await dispatch(getUserProfile(userId));
        setDatas(res?.payload?.data)
        setIsLoading(false)
        console.log(res)
    }

    useEffect(() => {
        if (userId) {
            fetchUserData()
        }
        else {
            setIsLoading(true);
        }
    }, [userId])

    console.log(datas)
    useEffect(() => {
        if (userData !== null) {
            setIsLoading(false);
        }
    }, [userData]);

    if (isLoading) {
        // Loading state: You might want to show a loading spinner or message here
        return <div>Loading...</div>;
    }
    console.log(userData)
    // Once userData is available, proceed with navigation logic
    return userData && allowedRoles.find((myRole) => myRole === userData?.role) ? (
        <Outlet />
    ) : userData ? (<Navigate to="/denied" />) : (<Navigate to="/user-login" />);
}

export default PrivateRoutes;

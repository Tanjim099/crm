import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useGetProfile from '../../hooks/useGetProfile';

function PrivateRoutes({ allowedRoles }) {
    console.log(allowedRoles)
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId);
    const userData = useGetProfile(userId);
    const [isLoading, setIsLoading] = useState(true);

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

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../redux/slices/userSlice';

function useGetProfile(id) {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await dispatch(getUserProfile(id));
                if (response?.payload && response?.payload?.data) {
                    setUserData(response?.payload?.data);
                    setError(null);
                } else {
                    setError("No user data found.");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }

        // Cleanup function
        return () => {
            setUserData(null); // Reset userData when unmounting
        };
    }, [dispatch, id]);

    return { userData, loading, error };
}

export default useGetProfile;


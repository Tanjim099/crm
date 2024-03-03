import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../redux/slices/userSlice';

function useGetProfile(id) {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchUserData() {
        setLoading(true);
        try {
            const res = await dispatch(getUserProfile(id));
            setUserData(res?.payload?.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchUserData();
        }
    }, [dispatch, id]);

    return { userData, loading, error };
}

export default useGetProfile;

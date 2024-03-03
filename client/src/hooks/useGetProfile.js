import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthProfile } from '../redux/slices/authSlice';
import { getUserProfile } from '../redux/slices/userSlice';

function useGetProfile(id) {
    // console.log(id)
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const userDatas = useSelector((state) => state.user);
    // console.log(userDatas)
    async function fetchAuthData() {
        const res = await dispatch(getUserProfile(id))
        setData(res?.payload?.data)
        // console.log(res)
    }

    useEffect(() => {
        fetchAuthData()
    }, [id])
    return data;
}

export default useGetProfile
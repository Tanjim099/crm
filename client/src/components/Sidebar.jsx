import React, { useEffect } from 'react'
import MenuList from './MenuList'
import menu, { hrMenu, internMenu, managerMenu, saleExecutiveMenu } from '../constants/menu'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthProfile } from '../redux/slices/authSlice';
import { getUserProfile } from '../redux/slices/userSlice';

function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { authData } = useSelector((state) => state.auth);
    // console.log("authData", authData);
    const getAuthId = localStorage.getItem("authId");
    const authId = JSON.parse(getAuthId)
    // console.log(authId)

    async function fetchAuthData() {
        await dispatch(getAuthProfile(authId))
    }

    const { userData } = useSelector((state) => state.user);
    // console.log(userData);
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId)
    // console.log(userId)

    async function fetchUserData() {
        await dispatch(getUserProfile(userId))
    }

    // console.log("userData.role", userData.role)

    useEffect(() => {
        if (authId) {
            fetchAuthData();
        }
        else if (userId) {
            fetchUserData()
        }
    }, [])
    // console.log("managerMenu", managerMenu)
    return (
        <div className='w-[160px] h-[100vh] bg-black p-4 text-white'>
            <h2 className=' text-center text-2xl font-bold'>LOGO</h2>
            <div className='py-4'>
                {<MenuList menuList={authData.role == "Admin" ? menu : (userData && userData.role == "Manager" ? managerMenu : (userData.role == "Hr" ? hrMenu : (userData.role == "Sales executive" ? saleExecutiveMenu : internMenu)))} />}
            </div>
        </div>
    )
}

export default Sidebar
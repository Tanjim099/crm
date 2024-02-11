import React, { useState } from 'react';
import registerImg from "../assets/registerimg.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/slices/userSlice';

function EmployeeLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.user);
    console.log(isLoggedIn);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    function handleInput(e) {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function onFormSubmits(e) {
        e.preventDefault();
        const res = await dispatch(userLogin(loginData));
        console.log(res);
        // if (res.payload.success) {
        //     navigate("/")
        //     await dispatch(getAuthProfile(res.payload.data._id))
        // }
    }
    return (
        <div className=' w-[100%] h-[100vh] bg-primary flex items-center justify-center'>
            <form action="" onSubmit={onFormSubmits} className=' w-[50%] h-[50vh] flex m-auto bg-white rounded-md'>
                <div className='w-[50%] h-[100%]'>
                    <img className='w-[100%] h-[100%] rounded-tl-md rounded-bl-md' src={registerImg} alt="" />
                </div>
                <div className=' w-[50%] flex flex-col gap-2 items-center justify-center p-4 ' >
                    <input
                        className='w-[100%] p-3 border-b-2 border-cyan-900 outline-none'
                        type="email"
                        name='email'
                        id='email'
                        placeholder='Email...'
                        value={loginData.email}
                        onChange={handleInput}
                    />
                    <input
                        className='w-[100%] p-3 border-b-2 border-cyan-900 outline-none'
                        type="text"
                        name='password'
                        id='password'
                        placeholder='Password...'
                        value={loginData.password}
                        onChange={handleInput}
                    />
                    <button
                        className='w-[100%] p-3 '
                        type='submit'

                    >
                        Login
                    </button>
                </div>

            </form>
        </div>
    )
}

export default EmployeeLogin
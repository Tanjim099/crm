import React, { useState } from 'react';
import registerImg from "../assets/registerimg.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, userData } = useSelector((state) => state.auth);
    console.log(isLoggedIn, userData);
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

    async function onFormSubmit(e) {
        e.preventDefault();
        const res = await dispatch(authLogin(loginData));
        if (res.payload.success) {
            navigate("/")
        }
    }
    return (
        <div className=' w-[100%] h-[100vh] bg-teal-600 flex items-center justify-center'>
            <form action="" onSubmit={onFormSubmit} className=' w-[50%] h-[50vh] flex m-auto bg-white rounded-md'>
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
                        className='w-[100%] p-1.5 text-white bg-emerald-600'
                        type='submit'

                    >
                        Login
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Login
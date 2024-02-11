import React, { useState } from 'react';
import registerImg from "../assets/registerimg.jpg"
import { useDispatch } from 'react-redux';
import { authRegister } from '../redux/slices/authSlice';

function Register() {
    const dispatch = useDispatch();
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })
    function handleInput(e) {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        await dispatch(authRegister(registerData));
    }
    return (
        <div className=' w-[100%] h-[100vh] bg-primary flex items-center justify-center'>
            <form action="" onSubmit={onFormSubmit} className=' w-[50%] h-[50vh] flex m-auto bg-white rounded-md'>
                <div className='w-[50%] h-[100%]'>
                    <img className='w-[100%] h-[100%] rounded-tl-md rounded-bl-md' src={registerImg} alt="" />
                </div>
                <div className=' w-[50%] flex flex-col gap-2 items-center justify-center p-4 ' >
                    <input
                        className='w-[100%] p-3 border-b-2 border-cyan-900 outline-none'
                        type="text"
                        name='name'
                        id='name'
                        placeholder='Name...'
                        value={registerData.name}
                        onChange={handleInput}
                    />
                    <input
                        className='w-[100%] p-3 border-b-2 border-cyan-900 outline-none'
                        type="email"
                        name='email'
                        id='email'
                        placeholder='Email...'
                        value={registerData.email}
                        onChange={handleInput}
                    />
                    <input
                        className='w-[100%] p-3 border-b-2 border-cyan-900 outline-none'
                        type="text"
                        name='password'
                        id='password'
                        placeholder='Password...'
                        value={registerData.password}
                        onChange={handleInput}
                    />
                    <button
                        className='w-[100%] p-3 '
                        type='submit'

                    >
                        Register
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Register
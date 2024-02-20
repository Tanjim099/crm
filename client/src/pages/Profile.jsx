import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/slices/userSlice';
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { BsPersonCircle } from 'react-icons/bs';

function Profile() {
    const dispatch = useDispatch();
    const { uid } = useParams();
    const { userData } = useSelector((state) => state.user);
    // console.log(userData);
    async function getProfile() {
        await dispatch(getUserProfile(uid));
    };

    const [updateData, setUpdateData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        instagram: "",
        facebook: "",
        github: "",
        avatar: undefined,
        previewImage: ""
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", () => {
                // Assuming updateData and setUpdateData are state variables from React
                setUpdateData({
                    ...updateData,
                    previewImage: fileReader.result,
                    avatar: uploadedImage
                });
            });
        }
    }


    function handleOnChange(event) {
        const { name, value } = event.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function onFormSubmit(e) {
        e.preventDefault();
        console.log(updateData)
    }

    useEffect(() => {
        getProfile();
    }, [])
    return (
        <Layout>
            <div className=' flex gap-4'>
                <div className=' bg-white w-[30%] h-fit border border-gray-200 p-3' >
                    <div className=' border border-black flex flex-col gap-4 items-center justify-center p-10 '>
                        <div className=' w-full flex items-center justify-center border-b-2 pb-4 border-black '>
                            <img
                                src="https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg"
                                className='w-[100px] h-[100px] rounded-full'
                                alt="" />
                        </div>
                        <div className=' w-full text-center border-b-2 pb-4 border-black'>
                            <h3>{userData.name}</h3>
                        </div>
                        <div className=' w-full text-center border-b-2 pb-4 border-black'>
                            <h3>{userData.email}</h3>
                        </div>
                        <div className=' w-full text-center border-b-2 pb-4 border-black'>
                            <h3>{userData.phone}</h3>
                        </div>
                        <div className='flex gap-3 text-xl'>
                            <NavLink className=" text-blue-500"><FaLinkedin /></NavLink>
                            <NavLink className=" text-[#f6574c]"><FaInstagramSquare /></NavLink>
                            <NavLink className=" text-[#316FF6]"><FaFacebookSquare /></NavLink>
                            <NavLink><FaSquareGithub /></NavLink>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-[70%] border border-gray-200 p-3'>
                    <div className=' border border-black flex flex-col gap-4  px-10 py-4 '>
                        <form action="" onSubmit={onFormSubmit} className=' flex flex-col gap-4 w-full'>
                            <div className='flex justify-between'>
                                <h3 className=' border-b-2 px-4 border-green-600'> Edit Profile </h3>
                                <button type='submit' className=' bg-green-500 px-4 py-1.5 text-white rounded text-sm'>Update</button>
                            </div>
                            <div className=' flex items-center justify-center gap-3 w-full'>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {updateData.previewImage ? (
                                        <img src={updateData.previewImage}
                                            alt=""
                                            className="w-24 h-24 rounded-full m-auto"
                                        />
                                    ) : (
                                        <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="image_uploads"
                                    name="image_uploads"
                                    accept=".jpg, .png, .svg, .jpeg"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className=' flex w-full  gap-3 justify-between'>
                                <div className='w-[33%]'>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder='Enter avatar...'
                                        className='w-full border  border-gray-500 rounded p-1.5 outline-none'
                                        value={updateData.name}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className='w-[33%]'>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className='w-full border  border-gray-500 rounded p-1.5 outline-none'
                                        placeholder='Enter name...'
                                        value={updateData.email}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className='w-[33%]'>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        className='w-full border  border-gray-500 rounded p-1.5 outline-none'
                                        placeholder='Enter email...'
                                        value={updateData.phone}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="linkedin">Linkedin</label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    id="linkedin"
                                    className='w-full border  border-gray-500 rounded p-1.5 outline-none'
                                    placeholder='Enter linkedin...'
                                    value={updateData.linkedin}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className=''>
                                <label htmlFor="instagram">Instagram</label>
                                <input
                                    type="text"
                                    name="instagram"
                                    id="instagram"
                                    className='w-full border  border-gray-500 rounded p-1.5 outline-none'
                                    placeholder='Enter instagram...'
                                    value={updateData.instagram}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className=''>
                                <label htmlFor="facebook">Facebook</label>
                                <input
                                    type="text"
                                    name="facebook"
                                    id="facebook"
                                    className='w-full border  border-gray-500 rounded p-1.5 outline-none'
                                    placeholder='Enter facebook...'
                                    value={updateData.facebook}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className=''>
                                <label htmlFor="github">Github</label>
                                <input
                                    type="text"
                                    name="github"
                                    id="github"
                                    className='w-full border  border-gray-500 rounded p-1.5 outline-none'
                                    placeholder='Enter github...'
                                    value={updateData.github}
                                    onChange={handleOnChange}
                                />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
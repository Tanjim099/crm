import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { FaPlus } from "react-icons/fa";
import Dropdown from '../components/Dropdonw';
import TaskModel from '../components/TaskModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getAllTasks, getTasksByUserId } from '../redux/slices/taskSlice';
import useGetProfile from '../hooks/useGetProfile';
import dateFormeter from '../helper/dateFormeter';

function Task() {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId);
    const { userData } = useGetProfile(userId);
    function onOpenTaskModel() {
        document.getElementById('task_model').showModal()
    };

    const { taskData } = useSelector((state) => state.task);
    console.log(taskData)
    async function fetcheTaskData() {
        // setIsLoading(true)
        await dispatch(getAllTasks());
        // setIsLoading(false)
    }

    async function fetcheTaskByUserID() {
        // setIsLoading(true)
        await dispatch(getTasksByUserId(userId));
        // setIsLoading(false)
    }

    // useEffect(() => {
    //     if (userData !== null) {
    //         setIsLoading(false);
    //     }
    //     else {
    //         setIsLoading(true)
    //     }
    // }, [userData]);
    // console.log("userData", userData)
    useEffect(() => {
        if (userData?.role === "Admin") {
            fetcheTaskData()
        } else {
            fetcheTaskByUserID()
        }
    }, [toggle, userData]);

    const [bigImage, setBigImage] = useState("");
    function handleSetImage(currImg) {
        setBigImage(currImg)
    }
    function handleRemoveBigImage() {
        setBigImage("")
    }

    async function handleDeleteTask(tid) {
        const res = await dispatch(deleteTask(tid));
        if (res?.payload?.success) {
            setToggle(!toggle)
        }
    }
    const bg = "linear-gradient(to bottom, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.33))";
    return (
        <>
            <Layout>
                <div className=''>
                    <div className=' bg-white p-3 flex justify-between items-center border border-gray-200'>
                        <div>
                            <h3 className=' text-2xl font-semibold'>Task ({taskData?.length || 0})</h3>
                        </div>
                        <div className=' flex gap-2'>
                            <div className='flex relative'>
                                <img className=' w-[40px] h-[40px] rounded-full relative' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944" alt="" />
                                <img className=' w-[40px] h-[40px] rounded-full relative' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944" alt="" />
                                <img className=' w-[40px] h-[40px] rounded-full relative' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944" alt="" />
                            </div>
                            <button onClick={onOpenTaskModel} className='bg-blue-600 text-white p-2 flex items-center gap-1'><FaPlus /> <span>Add Task</span></button>
                            <TaskModel />
                        </div>
                    </div>
                    {taskData && taskData.map((task, i) => (
                        <div key={i} className=' flex flex-col justify-between border border-gray-200 mt-5 relative'>
                            <div className=' bg-[#0d2a5a] flex gap-4 border-b border-black pb-2'>
                                <div className=' flex  gap-2'>
                                    <span className=' px-3 text-white rounded-md'>To Assigned </span>
                                    <span className=' text-white'>{task?.toAssigned?.name}</span>
                                </div>
                                <div className=' flex  gap-2 '>
                                    <span className=' px-3 text-white rounded-md'>Date </span>
                                    <span className=' text-white'>{dateFormeter(task?.createdAt)}</span>
                                </div>
                                <div className=' flex  gap-2'>
                                    <span className='  px-3 text-white rounded-md'>Status </span>
                                    <span className=' text-white'>Processing</span>
                                </div>
                                <div className=' flex  gap-2'>
                                    <label htmlFor="status">Status</label>
                                    <select name="" id="">
                                        <option value="">Done</option>
                                        <option value="">Processing</option>
                                        <option value="">Not Started</option>
                                    </select>
                                </div>
                            </div>
                            <div className=' bg-white p-3'>
                                <div>
                                    <div className='bg-white p-3 flex justify-between'>
                                        <h2 className=' text-lg font-medium'>{task.title}</h2>
                                        {/* <b>...</b> */}
                                    </div>
                                    <div className=' bg-white p-3 absolute right-5 top-0 bg-transparent font-bold text-xl cursor-pointer'>
                                        {userData?.role === "Admin" ? (
                                            <Dropdown>
                                                <button className="block px-4 py-2 text-sm text-black w-full text-left hover:bg-gray-100 hover:text-gray-900 "
                                                    role="menuitem">Edit</button>
                                                <button
                                                    onClick={() => handleDeleteTask(task._id)}
                                                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    Delete
                                                </button>
                                            </Dropdown>
                                        ) : (
                                            <select>
                                                <option value="">Done</option>
                                                <option value="">I will do</option>
                                                <option value="">No</option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className='  flex'>
                                    <div className=' w-[80%] flex  flex-col gap-3'>
                                        <p>
                                            {task.description}
                                        </p>
                                        <div>
                                            {task?.taskList?.map((tList, i) => (
                                                <div className='flex gap-2'>
                                                    <input type="checkbox" />
                                                    <label htmlFor="">{tList.item}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=' w-[20%] grid grid-cols-2 gap-2'>
                                        {task.images?.map((image) => (
                                            <img className='w-[120px] cursor-pointer' src={image.secure_url} alt="" onClick={() => handleSetImage(image.secure_url)} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>

            </Layout>
            <div className=' absolute top-0 h-[100vh] ' style={{ backgroundImage: bg }}>
                {/* <div className=' relative top-20 right-0 '> */}
                <button onClick={handleRemoveBigImage} className=' absolute top-20 right-40 text-white text-3xl'>x</button>
                {/* </div> */}
                <div className=' relative top-40'>
                    <img className=' w-[50%] m-auto' src={bigImage} alt="" />
                </div>
            </div>
        </>
    )
}

export default Task
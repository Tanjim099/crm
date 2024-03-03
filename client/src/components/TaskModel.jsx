import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthProfile } from '../redux/slices/authSlice';
import { getAllUsers, getUserProfile } from '../redux/slices/userSlice';
import { createTask } from '../redux/slices/taskSlice';
import TaskList from './TaskList';




function TaskModel() {
    const dispatch = useDispatch();
    const { allUserData } = useSelector((state) => state.user);
    const userData = [{ _id: "", name: "Select" }, ...allUserData]
    const [images, setImages] = useState([]);
    const [tastData, setTaskData] = useState({
        title: "",
        description: "",
        images: images,
        user: "",
    });
    const [currTaskList, setCurrTaskList] = useState("")
    const [tastList, setTaskList] = useState([]);

    function handleAddTaskList() {
        event.preventDefault();
        if (currTaskList == "") return
        let nextId = tastList.length + 1;
        setTaskList([...tastList, { id: nextId, item: currTaskList }]);
        setCurrTaskList("")
    }

    function handleRemoveTaskListField(id) {
        event.preventDefault();
        const newTaskList = tastList.filter((item) => item.id !== id);
        setTaskList(newTaskList)
    }

    function handleEditTaskList(id, item) {
        const editedTask = tastList.map((task) => {
            console.log(task)
            if (task == "") return
            if (task.id == id) {
                task.item = item
            }
            return task;
        })

        setTaskList(editedTask);
    }
    async function fetchUserData() {
        await dispatch(getAllUsers())
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    function handleImage(e) {
        try {
            const uploadImage = e.target.files;
            const fileReaderArray = Array.from(uploadImage).map((image) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(image);

                return new Promise((resolve) => {
                    fileReader.onload = () => {
                        resolve({
                            file: image,
                        })
                    }
                })
            })

            Promise.all(fileReaderArray).then((result) => {
                setImages((prev) => [...prev, ...result])
            })
        } catch (error) {
            console.log(error)
        }
    }
    function handleImageRemove(id) {
        event.preventDefault()
        const newImages = images.filter((image) => image?.file?.lastModified !== id)
        setImages(newImages);
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    async function handleFormSubmit() {
        event.preventDefault()
        const formData = new FormData();
        formData.append("title", tastData.title);
        formData.append("description", tastData.description);
        formData.append("toAssigned", tastData.user);
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i].file)
        }

        tastList.forEach((task, index) => {
            formData.append(`taskList[${index}][id]`, task.id);
            formData.append(`taskList[${index}][item]`, task.item);
        });
        // for (let i = 0; i < tastList.length; i++) {
        //     formData.append("taskList", tastList[i]);
        //     console.log(tastList[i])
        // }

        const res = await dispatch(createTask(formData))
    }
    return (
        <dialog id="task_model" className="modal rounded-none min-w-[100%]">
            <div className="modal-box  rounded-none containers min-w-[50%]">
                <h3 className="font-bold text-center text-lg">New Task</h3>
                <form className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name='title'
                            id='title'
                            placeholder='Enter Title...'
                            className=' p-1.5 border border-gray-500 rounded-sm shadow-sm'
                            onChange={handleInput}
                            value={tastData.title}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            name='description'
                            id='description'
                            placeholder='Enter Description...'
                            className=' p-1.5 border border-gray-500 rounded-sm shadow-sm min-h-[150px]'
                            onChange={handleInput}
                            value={tastData.description}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="taskList">Task List</label>
                        <div className=' flex justify-between items-center gap-2 w-full'>
                            <input
                                type="text"
                                name='taskList'
                                id='taskList'
                                placeholder='Enter Task List...'
                                className=' p-1.5 border border-gray-500 rounded-sm w-full'
                                value={currTaskList}
                                onChange={(e) => setCurrTaskList(e.target.value)}

                            />
                            <button onClick={handleAddTaskList} className=' bg-white p-2.5 text-black  rounded-sm' style={{ boxShadow: "inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)" }}><FaPlus /></button>
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            {tastList.map((task, i) => (
                                <TaskList key={i} item={task.item} editTask={(text) => handleEditTaskList(task.id, text)} deleteTask={() => handleRemoveTaskListField(task.id)} />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="message" className='h-[100px] shadow-sm border border-gray-500  text-center flex flex-col items-center justify-center cursor-pointer'>
                            <MdOutlineCloudUpload className='  text-5xl border rounded-full p-2' />
                            <span className=' text-blue-400 text-xs'>click to upload</span>
                        </label>
                        <input
                            type="file"
                            name='message'
                            id='message'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            hidden
                            onChange={handleImage}
                        />
                    </div>
                    {
                        images && images.map((image, i) => (
                            <div key={i} className=' p-1.5 border border-black rounded-sm shadow-md flex  justify-between items-center'>
                                <span>{image?.file?.name}</span>
                                <button onClick={() => handleImageRemove(image?.file?.lastModified)}><FaX /></button>
                            </div>
                        ))
                    }
                    <div className='flex flex-col'>
                        <label htmlFor="title">Select User</label>
                        <select name="user" id="user" onChange={handleInput} className=' p-1.5 border border-black rounded-sm shadow-sm'>
                            {
                                userData && userData.map((user, i) => (
                                    <option key={i} value={user._id}>{user.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className=' flex items-center justify-between'>
                        <div>
                            <button onClick={handleFormSubmit} type="submit" className=' px-10 bg-green-600 text-white p-1.5'>Apply Now</button>
                        </div>
                        <div className="">
                            <form method="dialog">
                                <button className="">Close</button>
                            </form>
                        </div>
                    </div>
                </form>
                {/* <div className="modal-action">
                    <form method="dialog">
                        <button className="">Close</button>
                    </form>
                </div> */}
            </div>
        </dialog>
    )
}

export default TaskModel
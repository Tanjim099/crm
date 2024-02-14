import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import RoleModel from './RoleModel';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';

function EmployeeModel() {
    const dispatch = useDispatch();
    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    })
    // console.log(employeeData)
    function handleInpute(e) {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function onSubmitForm(e) {
        e.preventDefault();
        const res = await dispatch(addUser(employeeData));
        if (res?.payload?.success) {
            setEmployeeData({
                name: "",
                email: "",
                phone: "",
                password: "",
            })
        }
        // console.log(res)
    }
    return (
        <dialog id="my_modal_1" className="modal rounded-none">
            <div className="modal-box rounded-none">
                <h3 className="font-bold text-lg">Add New Employee</h3>
                <form onSubmit={onSubmitForm} className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className=' font-medium'>Name</label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={employeeData.name}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Enter Email...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={employeeData.email}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="number"
                            name='phone'
                            id='phone'
                            placeholder='Enter Email...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={employeeData.phone}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input
                            ype="text"
                            name='password'
                            id='password'
                            placeholder='Enter Password...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={employeeData.password}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>

                        <div className='flex justify-between items-center'>
                            <label htmlFor="role">Role</label>
                            <button className=' bg-green-800 text-white p-1 flex items-center gap-1 text-xs rounded-md' onClick={() => document.getElementById('my_modal_2').showModal()}><FaPlus /> Add New Role</button>
                            <RoleModel />
                        </div>
                        <select onChange={handleInpute} name='role' id='role' className=' p-1.5 border border-black rounded-sm shadow-md'>
                            <option value={employeeData.role}>Admin</option>
                            <option value={employeeData.role}>Manager</option>
                            <option value={employeeData.role}>Team Leader</option>
                            <option value={employeeData.role}>Sales executive</option>
                            <option value={employeeData.role}>Intern</option>
                        </select>

                    </div>
                    <div>
                        <button type="submit" className='w-[100%] bg-green-600 text-white p-1.5'>Add</button>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default EmployeeModel
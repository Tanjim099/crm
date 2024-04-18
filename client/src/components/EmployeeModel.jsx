import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import RoleModel from './RoleModel';
import { useDispatch } from 'react-redux';
import { AdminUserUpdate, addUser } from '../redux/slices/userSlice';
import "../styles/custom.css"

function EmployeeModel({ data, flag, setFlag }) {
    // console.log(data);
    const dispatch = useDispatch();
    const [roleData, setRoleData] = useState(["Admin", "Hr", "Manager", "Team-Leader", "Sales-executive", "Intern"]);
    const [userStatus, setUserStatus] = useState(["Active", "Deactive"]);
    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        salary: ""
    })
    // console.log(employeeData)
    useEffect(() => {
        if (data) {
            // console.log(data)
            setEmployeeData((prev) => ({
                ...prev,
                name: data?.name,
                email: data?.email,
                phone: data?.phone,
                salary: data?.salary,
            }))
            for (let i = 0; i < roleData.length; i++) {
                if (roleData[i] == data.role) {
                    let temp = roleData[0]
                    roleData[0] = roleData[i];
                    roleData[i] = temp;
                    break;
                }
            }

            if (data.status !== userStatus[0]) {
                let temp = userStatus[0];
                userStatus[0] = userStatus[1];
                userStatus[1] = temp;
            }
        }
        else {
            console.log(data)
            setEmployeeData(() => ({
                name: "",
                email: "",
                phone: "",
                password: "",
                salary: ""
            }))
            setRoleData(["Admin", "Hr", "Manager", "Team Leader", "Sales Executive", "Intern"]);
        }
    }, [data])
    console.log(employeeData)
    function handleInpute(e) {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function onSubmitForm(e) {
        e.preventDefault();
        if (data) {
            const res = await dispatch(AdminUserUpdate([data._id, employeeData]));
            if (res?.payload?.success) setFlag(!flag)
        }
        else {
            const res = await dispatch(addUser(employeeData));
            if (res?.payload?.success) {
                setFlag(!flag)
                setEmployeeData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    salary: ""
                })
            }
        }
        // console.log(res)
    }
    return (
        <dialog id="my_modal_1" className="modal rounded-none">
            <div className="modal-box rounded-none containers">
                <h3 className="font-bold text-lg text-center">{data ? "Update User" : "Add New Employee"}</h3>
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
                            placeholder='Enter Phone...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={employeeData.phone}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            name='password'
                            id='password'
                            placeholder='Enter Password...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={employeeData.password}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="salary">Salary</label>
                        <input
                            type="Number"
                            name='salary'
                            id='salary'
                            placeholder='Enter Salary...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={employeeData.salary}
                            onChange={handleInpute}
                        />
                    </div>
                    {
                        data ? (
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="status">Status</label>
                                <select onChange={handleInpute} name='status' id='status' className=' p-1.5 border border-black rounded-sm shadow-md'>
                                    {userStatus && userStatus.map((s, i) => (
                                        <option key={i} value={s}>{s}</option>
                                    ))}
                                </select>

                            </div>
                        ) : null
                    }
                    <div className='flex flex-col gap-1'>

                        <div className='flex justify-between items-center'>
                            <label htmlFor="role">Role</label>
                            <button className=' bg-green-800 text-white p-1 flex items-center gap-1 text-xs rounded-md' onClick={() => document.getElementById('my_modal_2').showModal()}><FaPlus /> Add New Role</button>
                            <RoleModel />
                        </div>
                        <select onChange={handleInpute} name='role' id='role' className=' p-1.5 border border-black rounded-sm shadow-md'>
                            {roleData && roleData.map((role, i) => (
                                <option key={i} value={role}>{role}</option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <button type="submit" className='w-[100%] bg-green-600 text-white p-1.5'>{data ? "Update" : "Add"}</button>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        {/* onClick={() => setFlag(!flag)} */}
                        <button className="">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default EmployeeModel
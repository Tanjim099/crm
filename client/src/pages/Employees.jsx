import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EmployeeModel from '../components/EmployeeModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, userDelete } from '../redux/slices/userSlice';
import dateFormeter from '../helper/dateFormeter';


function Employees() {
    const dispatch = useDispatch();
    const [updatedData, setUpdatedData] = useState(null);
    const { allUserData } = useSelector((state) => state.user);
    const [flag, setFlag] = useState(false);
    console.log(allUserData)
    async function fetchUserData() {
        await dispatch(getAllUsers())
    }

    useEffect(() => {
        fetchUserData()
    }, [flag]);

    function handleEditBtn(data) {
        document.getElementById('my_modal_1').showModal()
        setUpdatedData(data);
    }
    function handleAddNewBtn() {
        document.getElementById('my_modal_1').showModal()
        setUpdatedData(null);
    }

    async function onDeleteUser(uid) {
        // alert("Are you sure to delete");
        if (window.confirm("Are you sure you want to delete the user ?")) {
            const res = await dispatch(userDelete(uid));
            if (res.payload.success) {
                setFlag(!flag)
            }
        }
    }
    return (
        <Layout>
            <div className='bg-white p-4 flex flex-col gap-3 relative border border-gray-200'>
                <div>
                    <button className=' bg-green-800 text-white px-4 py-1 flex items-center gap-1' onClick={handleAddNewBtn}><FaPlus /> Add Emplayee</button>
                    <EmployeeModel data={updatedData} flag={flag} setFlag={setFlag} />
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                            <div className="overflow-hidden">
                                <table
                                    className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                                    <thead className="border-b font-medium bg-[#0ea5e9] text-white">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                User Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Phone Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Photo
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Registered Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Salary
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='font-medium'>
                                        {allUserData && allUserData.map((user, i) => (
                                            <tr key={i} className="border-b dark:border-neutral-500">
                                                <td
                                                    className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                    {i + 1}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    {user.name}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    {user.email}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    {user.phone}
                                                </td>
                                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    <span className='bg-green-600 text-white px-2 py-1 font-bold rounded-sm'>{user.role}</span>
                                                </td>
                                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    <div
                                                        className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                                                        style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
                                                    ></div>
                                                </td>
                                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    {dateFormeter(user.createdAt)}
                                                </td>
                                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    {user.salary || "24000"}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    <span className='bg-green-600 text-white px-2 py-1 font-bold rounded-sm'>{user?.status}</span>
                                                </td>
                                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    <div className='flex gap-2 items-center justify-center'>
                                                        <button className=' bg-green-500 px-2 py-1 text-white rounded-md' onClick={() => handleEditBtn(user)}>
                                                            <MdOutlineModeEditOutline />
                                                        </button>
                                                        <button onClick={() => onDeleteUser(user._id)} className=' bg-red-500 px-2 py-1 text-white rounded-md'>
                                                            <FaRegTrashAlt />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Employees
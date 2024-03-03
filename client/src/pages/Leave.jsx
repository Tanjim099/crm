import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import LeaveModel from '../components/LeaveModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLeaves, getLeaveDataByUserID } from '../redux/slices/leaveSlice';
import dateFormeter from '../helper/dateFormeter';
import { MdOutlineModeEditOutline } from "react-icons/md";
import useGetProfile from '../hooks/useGetProfile';


function Leave() {
    const dispatch = useDispatch();
    const [leaveResponsedData, setLeaveResponsedData] = useState(["Pending", "Okay", "Not"]);
    //======================
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId)
    const { userData } = useGetProfile(userId);
    // console.log(userId)
    //====================
    const { leaveData } = useSelector((state) => state.leave);
    // console.log(leaveData);
    async function fetchAllLeavesData() {
        await dispatch(getAllLeaves());
    }
    async function fetchLeaveDataByUserID() {
        await dispatch(getLeaveDataByUserID(userId));
    }
    useEffect(() => {
        if (userData?.role == "Admin") {
            fetchAllLeavesData();
        }
        else {
            fetchLeaveDataByUserID()
        }
    }, [userData]);
    return (
        <Layout>
            <div className='bg-white p-4 flex flex-col gap-3 relative'>
                <div>
                    <button className=' bg-green-800 text-white px-4 py-1 flex items-center gap-1' onClick={() => document.getElementById('my_modal_1').showModal()}><FaPlus />Apply New Leave</button>
                    <LeaveModel />
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                            <div className="overflow-hidden">
                                <table
                                    className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                                    <thead className="border-b font-medium bg-teal-100">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-r px-3  py-4 dark:border-neutral-500">
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Phone Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Subject
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Message
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                From
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                To
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Responsed
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='font-medium'>
                                        {leaveData && leaveData.map((leave, i) => (
                                            <tr key={i} className="border-b dark:border-neutral-500">
                                                <td
                                                    className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                                                    {i + 1}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    {leave?.user?.name}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    {leave?.user?.email}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    {leave?.user?.phone}
                                                </td>
                                                <td className="whitespace-nowrap border-r px-2 py-4 dark:border-neutral-500">
                                                    <div className="w-25 h-auto bg-transparent resize-none overflow-auto ">
                                                        {leave?.subject}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap border-r pl-1 py-0 dark:border-neutral-500">
                                                    <textarea
                                                        value={leave?.message}
                                                        readOnly
                                                        className="w-30 h-auto bg-transparent resize-none"
                                                    >

                                                    </textarea>
                                                </td>
                                                <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    {leave?.from}
                                                </td>
                                                <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    {leave?.to}
                                                </td>
                                                <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    {userData && userData?.role == "Admin" ? (
                                                        <select name="" id="">
                                                            {leaveResponsedData.map((data, i) => (
                                                                <option key={i} value={data}>{data}</option>
                                                            ))}
                                                        </select>
                                                    ) : (leave?.responsed)}
                                                </td>
                                                <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    <div className='flex gap-2 items-center justify-center'>
                                                        <button className=' bg-green-500 px-2 py-1 text-white rounded-md'>
                                                            <MdOutlineModeEditOutline />
                                                        </button>
                                                        <button className=' bg-red-500 px-2 py-1 text-white rounded-md'>
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

export default Leave
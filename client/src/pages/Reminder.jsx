import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import axios from 'axios';
import ReminderModel from '../components/ReminderModel';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";

function Reminder() {
    // function foo() {
    //     setTimeout(() => {
    //         alert("Please to Tanjim")
    //     }, 2000)
    // }
    // useEffect(() => {
    //     foo()
    // }, []);http://localhost:8080/api/v1/reminder

    const [datas, setDatas] = useState([]);

    async function fetchData() {
        const res = await axios.get("http://localhost:8080/api/v1/reminder");
        if (res?.data?.success) {
            setDatas(res?.data?.data)
        }
        console.log(res?.data?.data)
    }
    useEffect(() => {
        fetchData()
    }, []);
    const [reminderTime, setReminderTime] = useState('');
    const [alertShown, setAlertShown] = useState(false);

    const handleReminderChange = (e) => {
        setReminderTime(e.target.value);
    };

    const setReminder = () => {
        const selectedTime = new Date(reminderTime).getTime();
        const currentTime = new Date().getTime();

        if (selectedTime > currentTime) {
            const timeUntilReminder = selectedTime - currentTime;
            setTimeout(() => {
                setAlertShown(true);
            }, timeUntilReminder);
        }
    };
    console.log(reminderTime)

    function handleAddNewReminder() {
        document.getElementById('reminderModel').showModal();
        setLeaveUpdateData(null);
    }
    return (
        <Layout>
            <div className='bg-white p-4 flex flex-col gap-3 relative'>
                <div>
                    <button className=' bg-green-800 text-white px-4 py-1 flex items-center gap-1' onClick={handleAddNewReminder}><FaPlus />Add New Reminder</button>
                    <ReminderModel />
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
                                                Applied Time
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Remaining Time
                                            </th>

                                            <th
                                                scope="col"
                                                className="border-r px-3 py-4 dark:border-neutral-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='font-medium'>
                                        {/* {leaveData && leaveData.map((leave, i) => ( */}
                                        <tr className="border-b dark:border-neutral-500">
                                            <td
                                                className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                                                1
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                Tanjim Alam
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                tanjimalam@gmail.com
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                8252107964
                                            </td>
                                            <td className="whitespace-nowrap border-r px-2 py-4 dark:border-neutral-500">
                                                <div className="w-25 h-auto bg-transparent resize-none overflow-auto ">
                                                    New Appartment
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap border-r pl-1 py-0 dark:border-neutral-500">
                                                <textarea
                                                    value={"Please call me after 2 pm"}
                                                    readOnly
                                                    className="w-30 h-auto bg-transparent resize-none"
                                                >

                                                </textarea>
                                            </td>
                                            <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                a
                                            </td>
                                            <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                a
                                            </td>
                                            {/* <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    {userData && userData?.role == "Admin" ? (
                                                        <select name="" id="" defaultValue={leave.responsed} onChange={(e) => handleResponseChange(leave._id, e.target.value)}>
                                                            {leaveResponsedData.map((data, i) => (
                                                                <option key={i} value={data}>{data}</option>
                                                            ))}
                                                        </select>
                                                    ) : (leave?.responsed)}
                                                </td> */}
                                            {/* <td className="whitespace-nowrap border-r px-3 py-4 dark:border-neutral-500">
                                                    <Dropdown>
                                                        <button

                                                            className="block px-4 py-2 text-sm text-black w-full text-left hover:bg-gray-100 hover:text-gray-900 "
                                                            role="menuitem"
                                                            onClick={() => onLeaveEdit(leave)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => onLeaveDelete(leave._id)}
                                                            className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                                                            role="menuitem"
                                                        >
                                                            Delete
                                                        </button>
                                                    </Dropdown>
                                                </td> */}
                                        </tr>
                                        {/* ))} */}

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

export default Reminder
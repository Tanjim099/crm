import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

function ReminderModel() {
    const dispatch = useDispatch();
    const getAuthId = localStorage.getItem("authId");
    const authId = JSON.parse(getAuthId)
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId)
    const [uId, setUId] = useState("");
    function fun() {
        if (authId) {
            setUId(authId)
        }
        else if (userId) {
            setUId(userId)
        }
    }
    useEffect(() => {
        fun()
    }, [])
    const [reminderData, setReminderData] = useState({
        user: uId,
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        reminderTime: ""
    });


    function handleChange(e) {
        const { name, value } = e.target;
        setReminderData((prev) => ({
            ...prev,
            [name]: value,
            user: uId
        }))
    }
    async function onSubmitForm(e) {
        e.preventDefault();
        const res = await axios.post("http://localhost:8080/api/v1/reminder/add", reminderData);
        console.log(res);
        console.log("clicked")

    }
    return (
        <dialog id="reminderModel" className="modal rounded-none">
            <div className="modal-box rounded-none containers">
                <h3 className="font-bold text-center text-lg">Apply New Reminder</h3>
                <form onSubmit={onSubmitForm} className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="subject">Name</label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={reminderData.name}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="from">Email</label>
                        <input
                            type="email"
                            name='email'
                            id='from_date'
                            placeholder='Enter Email...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={reminderData.email}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="to">Phone</label>
                        <input
                            type="number"
                            name='phone'
                            id='phone'
                            placeholder='Enter Phone...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={reminderData.phone}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="message">Subject</label>
                        <input
                            type="text"
                            name='subject'
                            id='subject'
                            placeholder='Enter subject...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={reminderData.subject}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="message">Message</label>
                        <textarea
                            type="text"
                            name='message'
                            id='message'
                            placeholder='Enter Message...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={reminderData.message}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="message">Reminder Time</label>
                        <input
                            type="datetime-local"
                            name='reminderTime'
                            id='reminderTime'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={reminderData.reminderTime}
                        />
                    </div>
                    <div className=' flex items-center justify-between'>
                        <div>
                            <button type="submit" className=' px-10 bg-green-600 text-white p-1.5'>Apply Now</button>
                        </div>
                        <div className="">
                            <form method="dialog">
                                <button className="">Close</button>
                            </form>
                        </div>
                    </div>
                </form>

            </div>
        </dialog>
    )
}

export default ReminderModel
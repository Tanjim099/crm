import React, { useEffect, useState } from 'react'
import { ApplyLeave, updateLeave } from '../redux/slices/leaveSlice';
import { useDispatch } from 'react-redux';
import "../styles/custom.css"

function LeaveModel({ leaveUpdateData, isLoad, setIsLoad }) {
    console.log(leaveUpdateData)
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
    const [leaveData, setLeaveData] = useState({
        user: uId,
        subject: "",
        message: "",
        from: "",
        to: ""
    });

    useEffect(() => {
        if (leaveUpdateData) {
            setLeaveData((prev) => ({
                ...prev,
                user: uId,
                subject: leaveUpdateData?.subject,
                message: leaveUpdateData?.message,
                from: leaveUpdateData?.from,
                to: leaveUpdateData?.to
            }))
        }
        else {
            setLeaveData({
                user: uId,
                subject: "",
                message: "",
                from: "",
                to: ""
            });
        }
    }, [leaveUpdateData])

    function handleChange(e) {
        const { name, value } = e.target;
        setLeaveData((prev) => ({
            ...prev,
            [name]: value,
            user: uId
        }))
    }
    async function onSubmitForm(e) {
        e.preventDefault();
        if (leaveUpdateData) {
            const res = await dispatch(updateLeave([leaveUpdateData._id, leaveData]));
            if (res?.payload?.success) {
                setIsLoad(!isLoad)
            }
            console.log(res)
        }
        else {
            const res = await dispatch(ApplyLeave(leaveData));
            if (res?.payload?.success) {
                setIsLoad(!isLoad)
                setLeaveData({
                    user: uId,
                    subject: "",
                    message: "",
                    from: "",
                    to: ""
                })
            }
        }
    }
    return (
        <dialog id="my_modal_1" className="modal rounded-none">
            <div className="modal-box rounded-none containers">
                <h3 className="font-bold text-center text-lg">Apply New Leave</h3>
                <form onSubmit={onSubmitForm} className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            name='subject'
                            id='subject'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={leaveData.subject}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="from">From</label>
                        <input
                            type="date"
                            name='from'
                            id='from_date'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={leaveData.from}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="to">To</label>
                        <input
                            type="date"
                            name='to'
                            id='to_date'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={leaveData.to}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="message">Message</label>
                        <textarea
                            type="text"
                            name='message'
                            id='message'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            onChange={handleChange}
                            value={leaveData.message}
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
                {/* <div className="modal-action">
                    <form method="dialog">
                        <button className="">Close</button>
                    </form>
                </div> */}
            </div>
        </dialog>
    )
}

export default LeaveModel

{/* <div className='flex flex-col'>
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                name='subject'
                                id='subject'
                                placeholder='Enter Name...'
                                className=' p-1.5 border border-black rounded-sm shadow-md'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="from_date">From</label>
                            <input
                                type="date"
                                name='from_date'
                                id='from_date'
                                placeholder='Enter Name...'
                                className=' p-1.5 border border-black rounded-sm shadow-md'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="to_date">From</label>
                            <input
                                type="date"
                                name='to_date'
                                id='to_date'
                                placeholder='Enter Name...'
                                className=' p-1.5 border border-black rounded-sm shadow-md'
                            />
                        </div> */}
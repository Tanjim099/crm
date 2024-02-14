import React, { useState } from 'react'

function LeaveModel() {
    const [leaveData, setLeaveData] = useState({
        subject: "",
        from: "",
        to: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setLeaveData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    console.log(leaveData)
    return (
        <dialog id="my_modal_1" className="modal rounded-none">
            <div className="modal-box rounded-none">
                <h3 className="font-bold text-center text-lg">Apply New Leave</h3>
                <form className='flex flex-col gap-2'>
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
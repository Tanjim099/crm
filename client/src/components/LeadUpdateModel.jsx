import React, { useEffect, useState } from 'react';
import "../styles/custom.css"
import { useDispatch, useSelector } from 'react-redux';
import { getLead, updateLead } from '../redux/slices/leadSlice';

function LeadUpdateModel({ leadUpdateId, forReload, setForReload }) {
    // console.log(leadUpdateId)
    const dispatch = useDispatch()
    const { lead } = useSelector((state) => state?.lead);
    const [newUpdateLeadData, setNewUpdateLeadData] = useState({
        name: "",
        email: "",
        phone: "",
        projectName: "",
        message: ""
    });


    async function fetchLead(id) {
        await dispatch(getLead(id));

    }



    useEffect(() => {
        if (leadUpdateId) {
            fetchLead(leadUpdateId)
        }
    }, [leadUpdateId]);

    useEffect(() => {
        setNewUpdateLeadData({
            name: lead?.name,
            email: lead.email || "",
            phone: lead.phone || "",
            projectName: lead.projectName || "",
            message: ""
        })
    }, [lead])

    function handleInpute(e) {
        const { name, value } = e.target;
        setNewUpdateLeadData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await dispatch(updateLead([lead?._id, newUpdateLeadData]));
        if (res?.payload?.success) {
            setForReload(!forReload)
        }
        console.log(res);
    }

    return (
        <dialog id="lead_update_model" className="modal rounded-none">

            <div className="modal-box rounded-none containers">
                <h3 className="font-bold text-lg">Update Lead</h3>
                <form onSubmit={handleSubmit} className='flex text-left flex-col gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            placeholder='Enter Name...'
                            className=' p-2 border rounded-full shadow-sm outline-none'
                            value={newUpdateLeadData.name}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Enter email...'
                            className=' p-2 border rounded-full shadow-sm outline-none'
                            value={newUpdateLeadData.email}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="number"
                            name='phone'
                            id='phone'
                            placeholder='Enter phone...'
                            className=' p-2 border rounded-full shadow-sm outline-none'
                            value={newUpdateLeadData.phone}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            type="text"
                            name='projectName'
                            id='projectName'
                            placeholder='Enter project...'
                            className=' p-2 border rounded-full shadow-sm outline-none'
                            value={newUpdateLeadData.projectName}
                            onChange={handleInpute}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="message">Message</label>
                        <textarea
                            type="text"
                            name='message'
                            id='message'
                            placeholder='Enter Name...'
                            className=' p-2 border rounded-md shadow-sm outline-none'
                            value={newUpdateLeadData.message}
                            onChange={handleInpute}
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

export default LeadUpdateModel
import React, { useEffect, useState } from 'react'
import { getLead } from '../redux/slices/leadSlice';
import { useDispatch, useSelector } from 'react-redux';

function LeadMessageReadModel({ leadMessageId }) {
    const dispatch = useDispatch()
    const { lead } = useSelector((state) => state?.lead);
    // console.log(lead)
    // useEffect(() => {
    //     if (leadMessage) {
    //         setMessageData(leadMessage);
    //     }
    // }, [leadMessage]);

    // console.log(leadMessage)

    async function fetchLead(id) {
        await dispatch(getLead(id));

    }

    const messageData = []


    useEffect(() => {
        if (leadMessageId) {
            fetchLead(leadMessageId)
        }
    }, [leadMessageId]);
    return (
        <dialog id="LeadMessageReadModel" className="modal rounded-none">
            <div className="modal-box rounded-none containers">
                <form className='flex flex-col gap-2'>
                    <ul>
                        {messageData?.map((message, i) => <li key={i}>{message}</li>)}
                    </ul>
                    <div className=' flex items-center justify-end'>
                        <div className="">
                            <form method="dialog" className=' flex items-end justify-end'>
                                <button className="">Close</button>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default LeadMessageReadModel
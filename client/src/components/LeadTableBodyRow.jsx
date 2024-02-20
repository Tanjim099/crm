import React, { useState } from 'react'
import dateFormeter from '../helper/dateFormeter';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { updateLeadStatus } from '../redux/slices/leadSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LeadTableBodyRow({ lead = [], sNo, handleSelectId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status, setStatus] = useState(["Not Responed", "Pending", "Done"]);
    async function handleChange(lid, value) {
        await dispatch(updateLeadStatus([lid, value]))
    }
    return (
        <tr className="border-b dark:border-neutral-500 even:bg-slate-100">
            <th className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                <label>
                    <input type="checkbox" value={lead._id} onClick={(e) => handleSelectId(e.target.value)} className="" />
                </label>
            </th>
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {sNo + 1}
            </td>

            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {lead.name}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {lead.email}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {lead.phone}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {lead.projectName}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {dateFormeter(lead?.createdAt)}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                <select name="" bordered={false} defaultValue={lead.status} onChange={(event) => handleChange(lead._id, event.target.value)} id="" className=' bg-transparent'>
                    {status && status.map((s, i) => (
                        <option key={i} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {lead.assingTo?.name || "Not Assign"}
            </td>

            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
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
    )
}

export default LeadTableBodyRow
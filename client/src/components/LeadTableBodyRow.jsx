import React, { useState } from 'react'
import dateFormeter from '../helper/dateFormeter';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { updateLeadStatus } from '../redux/slices/leadSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropdown from './Dropdonw';

function LeadTableBodyRow({ lead = [], sNo, handleSelectId, onDeleteLead }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status, setStatus] = useState(["Not Responed", "Pending", "Done"]);
    async function handleChange(lid, value) {
        await dispatch(updateLeadStatus([lid, value]))
    }

    const [toggle, setToggle] = useState(false);
    return (
        <tr className="border-b dark:border-neutral-500 even:bg-slate-100">
            <th className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                <div className='flex gap-2 items-center justify-center'>
                    <label>
                        <input type="checkbox" value={lead._id} onClick={(e) => handleSelectId(e.target.value)} className="" />
                    </label>
                    <span>{sNo + 1}</span>
                </div>
            </th>
            {/* <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                {sNo + 1}
            </td> */}

            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                {lead.name}
            </td>
            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                {lead.email}
            </td>
            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                {lead.phone}
            </td>
            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                {lead.projectName}
            </td>
            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                Read...
            </td>
            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                {dateFormeter(lead?.createdAt)}
            </td>
            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                <select name="" bordered={false} defaultValue={lead.status} onChange={(event) => handleChange(lead._id, event.target.value)} id="" className=' bg-transparent'>
                    {status && status.map((s, i) => (
                        <option key={i} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </td>
            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                {lead.assingTo?.name || "Not Assign"}
            </td>

            <td className="whitespace-nowrap border-r px-3 py-4 font-medium dark:border-neutral-500">
                {/* <div className='flex gap-2 items-center justify-center absolute '>

                    <div className=' absolute flex'>
                        {toggle ? <div className=' relative bg-white'>
                            <p>hello hell</p>
                        </div> : null}
                        <button className=' relative bg-white' onClick={() => setToggle(!toggle)}>:</button>
                    </div>
                    <button className=' bg-green-500 px-2 py-1 text-white rounded-md'>
                        <MdOutlineModeEditOutline />
                    </button>
                    <button className=' bg-red-500 px-2 py-1 text-white rounded-md'>
                        <FaRegTrashAlt />
                    </button>
                </div> */}
                <Dropdown>
                    <button

                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDeleteLead(lead._id)}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                    >
                        Delete
                    </button>
                </Dropdown>
            </td>
        </tr>
    )
}

export default LeadTableBodyRow
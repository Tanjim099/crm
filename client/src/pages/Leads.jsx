import React from 'react'
import Layout from '../components/Layout';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";

function Leads() {
    return (
        <Layout>
            <div className='w-100'>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                        {/* head */}
                        <thead className="border-b font-medium bg-teal-100">
                            <tr >
                                {/* <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th> */}
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Mark</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">No.</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Name</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Email</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Phone</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Project Name</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Date</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Status</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Assign</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="border-b font-medium bg-white">
                            {/* row 1 */}
                            {
                                [...Array(6)].map((_, i) => (
                                    <tr className="border-b dark:border-neutral-500">
                                        <th className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            <label>
                                                <input type="checkbox" className="" />
                                            </label>
                                        </th>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            1
                                        </td>

                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            Nick
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            nick@gmail.com
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">835302854</td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            Sobha India
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            23-01-2024
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            <select name="" defaultValue={"Tanjim"} id="">
                                                <option value="pendign">
                                                    Pending
                                                </option>
                                                <option value="pendign">
                                                    Not Responed
                                                </option>
                                                <option value="pendign">
                                                    Done
                                                </option>
                                            </select>
                                        </td>
                                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                            <select name="" id="">
                                                <option value="">Vira</option>
                                                <option value="">Dev</option>
                                                <option value="">Rohit</option>
                                                <option value="">Nisha</option>
                                                <option value="">Danish</option>
                                            </select>
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
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Leads
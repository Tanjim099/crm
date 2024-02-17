import React, { useEffect } from 'react'
// import { format } from 'date-fns'
import { Link } from 'react-router-dom'
// import { getOrderStatus } from '../lib/helpers'
import { getAllLeads } from '../redux/slices/leadSlice'
import { useDispatch, useSelector } from 'react-redux'
import dateFormeter from '../helper/dateFormeter'

const recentLeadData = [
    {
        id: '1',
        product_id: '4324',
        customer_id: '23143',
        customer_name: 'Shirley A. Lape',
        order_date: '2022-05-17T03:24:00',
        order_total: '$435.50',
        current_order_status: 'PLACED',
        shipment_address: 'Cottage Grove, OR 97424'
    },
    {
        id: '7',
        product_id: '7453',
        customer_id: '96453',
        customer_name: 'Ryan Carroll',
        order_date: '2022-05-14T05:24:00',
        order_total: '$96.35',
        current_order_status: 'CONFIRMED',
        shipment_address: 'Los Angeles, CA 90017'
    },
    {
        id: '2',
        product_id: '5434',
        customer_id: '65345',
        customer_name: 'Mason Nash',
        order_date: '2022-05-17T07:14:00',
        order_total: '$836.44',
        current_order_status: 'SHIPPED',
        shipment_address: 'Westminster, CA 92683'
    },
    {
        id: '3',
        product_id: '9854',
        customer_id: '87832',
        customer_name: 'Luke Parkin',
        order_date: '2022-05-16T12:40:00',
        order_total: '$334.50',
        current_order_status: 'SHIPPED',
        shipment_address: 'San Mateo, CA 94403'
    },
    {
        id: '4',
        product_id: '8763',
        customer_id: '09832',
        customer_name: 'Anthony Fry',
        order_date: '2022-05-14T03:24:00',
        order_total: '$876.00',
        current_order_status: 'OUT_FOR_DELIVERY',
        shipment_address: 'San Mateo, CA 94403'
    },
    {
        id: '5',
        product_id: '5627',
        customer_id: '97632',
        customer_name: 'Ryan Carroll',
        order_date: '2022-05-14T05:24:00',
        order_total: '$96.35',
        current_order_status: 'DELIVERED',
        shipment_address: 'Los Angeles, CA 90017'
    }
]

export default function RecentLead() {
    const dispatch = useDispatch()
    const { leads } = useSelector((state) => state.lead);
    console.log(leads)
    const page = 1;
    const limit = 5;
    async function fetchLeadData() {
        const res = await dispatch(getAllLeads({ page: page, limit: limit }));
        setLeadsData(res?.payload?.data);
    };
    useEffect(() => {
        fetchLeadData()
    }, []);
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Leads</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                    <thead className="border-b font-medium text-white bg-[#0ea5e9]">
                        <tr >
                            <th scope="col"
                                className="border-r px-2 py-3 dark:border-neutral-500">No.</th>
                            <th scope="col"
                                className="border-r px-2 py-3 dark:border-neutral-500">Name</th>
                            <th scope="col"
                                className="border-r px-2 py-3 dark:border-neutral-500">Email</th>
                            <th scope="col"
                                className="border-r px-2 py-3 dark:border-neutral-500">Phone</th>
                            <th scope="col"
                                className="border-r px-2 py-3 dark:border-neutral-500">Project Name</th>
                            <th scope="col"
                                className="border-r px-2 py-3 dark:border-neutral-500">Date</th>
                            <th scope="col"
                                className="border-r px-2 py-3 dark:border-neutral-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="border-b font-medium bg-white">
                        {/* row 1 */}
                        {
                            leads && leads.map((lead, i) => (
                                <tr key={i} className="border-b dark:border-neutral-500 even:bg-slate-100">
                                    <td className="whitespace-nowrap border-r px-2 py-3 font-medium dark:border-neutral-500">
                                        {i + 1}
                                    </td>

                                    <td className="whitespace-nowrap border-r  px-2 py-3 font-medium dark:border-neutral-500">
                                        {lead.name}
                                    </td>
                                    <td className="whitespace-nowrap border-r px-2 py-3 font-medium dark:border-neutral-500">
                                        {lead.email}
                                    </td>
                                    <td className="whitespace-nowrap border-r  px-2 py-3 font-medium dark:border-neutral-500">
                                        {lead.phone}
                                    </td>
                                    <td className="whitespace-nowrap border-r  px-2 py-3 font-medium dark:border-neutral-500">
                                        {lead.projectName}
                                    </td>
                                    <td className="whitespace-nowrap border-r  px-2 py-3 font-medium dark:border-neutral-500">
                                        {dateFormeter(lead?.createdAt)}
                                    </td>
                                    <td className="whitespace-nowrap border-r  px-2 py-3 font-medium dark:border-neutral-500">
                                        {lead.status}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
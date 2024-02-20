import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { filterByProjectName, filterByStatus, getAllLeads, getLeadsByUserId, updateLeadAssign, updateLeadStatus } from '../redux/slices/leadSlice';
import { getAllUsers, getUserProfile } from '../redux/slices/userSlice';
import dateFormeter from '../helper/dateFormeter';
import { getAuthProfile } from '../redux/slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import LeadTableBodyRow from '../components/LeadTableBodyRow';

function Leads() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [status, setStatus] = useState(["Not Responed", "Pending", "Done"]);
    const [selectId, setSelectId] = useState([]);
    const [leadsData, setLeadsData] = useState([]);
    // console.log(leadsData)
    const [limit, setLimit] = useState(15);
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const [forReload, setForReload] = useState(false);
    //==========================

    const { authData } = useSelector((state) => state.auth);
    const getAuthId = localStorage.getItem("authId");
    const authId = JSON.parse(getAuthId)
    // console.log(authId)

    const { userData } = useSelector((state) => state.user);
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId)
    // console.log(userId)

    async function fetchAuthData() {
        await dispatch(getAuthProfile(authId))
    }

    async function fetchUserData() {
        await dispatch(getUserProfile(userId))
    }

    useEffect(() => {
        if (authId) {
            fetchAuthData();
        }
        else if (userId) {
            fetchUserData()
        }
    }, [])

    //==========================
    const { leads } = useSelector((state) => state.lead);
    async function fetchLeadData() {
        const res = await dispatch(getAllLeads({ page: page, limit: limit }));
        setLeadsData(res?.payload?.data);
    };

    async function fetchLeadByUserId() {
        const res = await dispatch(getLeadsByUserId(userId));
        console.log(res)
        setLeadsData(res?.payload?.data);
    }

    const { allUserData } = useSelector((state) => state.user);
    // console.log(allUserData)
    const assignUserData = allUserData.filter((user) => user.role !== "Hr" && user.role !== "Team Leader");
    async function fetchUserData() {
        await dispatch(getAllUsers())
    }
    // console.log("authData", authData)
    useEffect(() => {
        fetchUserData();
        if (userId) {
            fetchLeadByUserId()
        }
        if (authId) {
            fetchLeadData();
        }
    }, [page, forReload]);

    // async function handleChange(lid, value) {
    //     await dispatch(updateLeadStatus([lid, value]))
    // }
    function handleSelectId(id) {
        if (selectId.includes(id)) {
            setSelectId(selectId.filter(item => item !== id));
        } else {
            setSelectId([...selectId, id]);
        }
    }
    const [assignUserId, setAssignId] = useState(assignUserData[0]?._id);
    function handleAssignUserIdChange(value) {
        // console.log(value)
        setAssignId(value)
        // const res = await dispatch(updateLeadAssign([selectId, value]));
        // console.log(res);
    }
    async function onAssignLeads() {
        const res = await dispatch(updateLeadAssign([selectId, assignUserId]));
        if (res?.payload?.success) {
            setForReload(!forReload)
        }
        console.log(res);
    }

    //pagination start
    async function handleNextPage() {
        // setCurrentPage((prev) => prev + 1);
        const nextPage = parseInt(page) + 1;
        await dispatch(getAllLeads({ page: nextPage, limit: limit }));
        navigate(`/leads/page/${nextPage}`)
    }
    async function handlePrevPage() {
        // setCurrentPage((prev) => prev - 1);
        const prevPage = parseInt(page) - 1;
        await dispatch(getAllLeads({ page: prevPage, limit: limit }));
        navigate(`/leads/page/${prevPage}`)
    }
    //pagination end

    //lead filter by project name start
    const projectNames = ["select", ...new Set(leadsData.map(item => item.projectName))];
    // const projectNamesByUserId = ["select", ...new Set(leads.map(item => item.projectName))];
    const [currProjectName, setCurrentProjectName] = useState("");
    function handleFilterByProjectName(name) {
        console.log(name);
        setCurrentProjectName(name)
    }

    async function onFilterLeadByProjectName() {
        if (currProjectName !== "Select" && currProjectName !== "") {
            const res = await dispatch(filterByProjectName(currProjectName));
            // console.log(res);
        }
    }
    //lead filter by project name end

    // lead filter by status start
    const { filteredLeads } = useSelector((state) => state.lead);
    console.log(filteredLeads);
    const [filterStatus, setFilterStatus] = useState(["Select", "Not Responed", "Pending", "Done"]);
    const [currentStatus, setCurrentStatus] = useState("");
    async function onFilterByStatus() {
        if (currentStatus !== "Select" && currentStatus !== "") {
            const res = await dispatch(filterByStatus(currentStatus))
            console.log(res);

        }
    }

    useEffect(() => {
        onFilterByStatus()
    }, [])
    // lead filter by status end
    return (
        <Layout>
            <div className='w-100 bg-white p-4 flex flex-col gap-3 relative' >
                <div className='flex gap-5 items-center justify-center'>
                    {authData && authData.role == "Admin" ? (
                        <div className='flex gap-2 items-center p-2 rounded shadow'>
                            <span className=' text-sm font-medium text-gray-600'>Assign To</span>
                            <select name="" id="" onChange={(e) => handleAssignUserIdChange(e.target.value)} className='text-sm px-1 py-1 border outline-none flex items-center gap-1'>
                                {assignUserData && assignUserData?.map((user, i) => (
                                    <>
                                        <option key={i} value={user._id}>{user.name}</option>

                                    </>
                                ))}
                            </select>
                            <button onClick={onAssignLeads} className='text-sm bg-[#ea580c] text-white px-2 py-1 rounded'>Apply</button>
                        </div>
                    ) : null}
                    <div>
                        <div className='flex gap-2 items-center p-2 rounded shadow'>
                            <span className=' text-sm font-medium text-gray-600'>Filter by Project Name</span>
                            <select name="" id="" onChange={(e) => handleFilterByProjectName(e.target.value)} className='text-sm px-1 py-1 border outline-none flex items-center gap-1'>
                                {projectNames && projectNames?.map((pName, i) => (
                                    <>
                                        <option key={i} value={pName}>{pName}</option>

                                    </>
                                ))}
                            </select>
                            <button onClick={onFilterLeadByProjectName} className='text-sm bg-[#0ea5e9] text-white px-2 py-1 rounded'>Apply</button>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center p-2 rounded shadow'>
                            <span className=' text-sm font-medium text-gray-600'>Filter by Status</span>
                            <select name="" id="" onChange={(e) => setCurrentStatus(e.target.value)} className=' text-sm px-1 py-1 border outline-none flex items-center gap-1'>
                                {filterStatus && filterStatus?.map((s, i) => (
                                    <>
                                        <option key={i} value={s} className='text-sm'>{s}</option>

                                    </>
                                ))}
                            </select>
                            <button className='text-sm bg-[#00C49F] text-white px-2 py-1 rounded' onClick={() => onFilterByStatus()}>Apply</button>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center p-2 rounded shadow'>
                            <span className=' text-sm font-medium text-gray-600'>Filter by Date</span>
                            <input type="date" className='text-sm px-1 py-1 border outline-none flex items-center gap-1' />
                            <button className='text-sm bg-[#ff00a2] text-white px-2 py-1 rounded'>Apply</button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                        {/* head */}
                        <thead className="border-b font-medium bg-[#0ea5e9] text-white">
                            <tr >
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
                                    className="border-r px-6 py-4 dark:border-neutral-500">Assigned</th>
                                <th scope="col"
                                    className="border-r px-6 py-4 dark:border-neutral-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="border-b font-medium bg-white">
                            {/* row 1 */}
                            {filteredLeads.length > 0 ? filteredLeads.map((lead, i) => <LeadTableBodyRow lead={lead} key={i} sNo={i} handleSelectId={handleSelectId} />) : leadsData?.map((lead, i) => <LeadTableBodyRow lead={lead} key={i} sNo={i} handleSelectId={handleSelectId} />)}
                        </tbody>
                    </table>
                    <div className=' flex items-center justify-end mt-2'>
                        <div className="join grid grid-cols-3 gap-2">
                            <button className="join-item btn-outline border p-1 hover:bg-green-800" onClick={handlePrevPage} disabled={page == 1}>Prev</button>
                            {/* <input type="number" className=" w-10 border p-1" value={1} readOnly /> */}
                            <span className='join-item btn-outline border p-1 text-center hover:bg-green-800'>{page}</span>
                            <button className="join-item btn-outline border p-1 hover:bg-green-800" onClick={handleNextPage}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Leads
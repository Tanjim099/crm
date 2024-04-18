import React from 'react'
import Layout from '../components/Layout'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import LeadAndEmployeeChart from '../components/LeadAndEmployeeChart'
import LeadPieChart from '../components/LeadPicChart'
import RecentLead from '../components/RecentLead'
import useGetProfile from '../hooks/useGetProfile'

function Dashboard() {
    const getUserId = localStorage.getItem("userId");
    const userId = JSON.parse(getUserId)
    const { userData } = useGetProfile(userId);
    // console.log(userData)
    return (
        <Layout>
            <div className='flex flex-col gap-4 '>
                <DashboardStatsGrid />
                <div className='flex gap-4'>
                    <LeadAndEmployeeChart />
                    <LeadPieChart />
                </div>
                <div>
                    {userData && userData.role == "Admin" ? <RecentLead /> : null}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
import React from 'react'
import Layout from '../components/Layout'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import LeadAndEmployeeChart from '../components/LeadAndEmployeeChart'
import LeadPieChart from '../components/LeadPicChart'
import RecentLead from '../components/RecentLead'

function Dashboard() {
    return (
        <Layout>
            <div className='flex flex-col gap-4 '>
                <DashboardStatsGrid />
                <div className='flex gap-4'>
                    <LeadAndEmployeeChart />
                    <LeadPieChart />
                </div>
                <div>
                    {/* <RecentLead /> */}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
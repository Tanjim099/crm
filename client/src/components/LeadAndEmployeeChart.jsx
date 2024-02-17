import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    {
        name: 'Jan',
        Employee: 4000,
        Lead: 2400
    },
    {
        name: 'Feb',
        Employee: 3000,
        Lead: 1398
    },
    {
        name: 'Mar',
        Employee: 2000,
        Lead: 9800
    },
    {
        name: 'Apr',
        Employee: 2780,
        Lead: 3908
    },
    {
        name: 'May',
        Employee: 1890,
        Lead: 4800
    },
    {
        name: 'Jun',
        Employee: 2390,
        Lead: 3800
    },
    {
        name: 'July',
        Employee: 3490,
        Lead: 4300
    },
    {
        name: 'Aug',
        Employee: 2000,
        Lead: 9800
    },
    {
        name: 'Sep',
        Employee: 2780,
        Lead: 3908
    },
    {
        name: 'Oct',
        Employee: 1890,
        Lead: 4800
    },
    {
        name: 'Nov',
        Employee: 2390,
        Lead: 3800
    },
    {
        name: 'Dec',
        Employee: 3490,
        Lead: 4300
    }
]

export default function LeadAndEmployeeChart() {
    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Leads and Employees</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Lead" fill="#0ea5e9" />
                        <Bar dataKey="Employee" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
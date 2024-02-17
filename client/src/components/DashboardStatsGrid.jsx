import React from 'react';
import { IoBagHandle } from "react-icons/io5"

function DashboardStatsGrid() {
    return (
        <div className='flex gap-4 w-full'>
            {/* <BoxWrapper>
                <div className=' rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
                    <IoBagHandle className=" text-2xl text-white" />
                </div>
                <div className=' pl-4'>
                    <span className=' text-sm text-gray-500 font-light'>Total Leads</span>
                    <div className=' flex items-center'>
                        <strong className=' text-xl text-gray-700 font-semibold'>2330</strong>
                        <span className=' text-sm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className=' rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
                    <IoBagHandle className=" text-2xl text-white" />
                </div>
                <div className=' pl-4'>
                    <span className=' text-sm text-gray-500 font-light'>Total Leads</span>
                    <div className=' flex items-center'>
                        <strong className=' text-xl text-gray-700 font-semibold'>2330</strong>
                        <span className=' text-sm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className=' rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
                    <IoBagHandle className=" text-2xl text-white" />
                </div>
                <div className=' pl-4'>
                    <span className=' text-sm text-gray-500 font-light'>Total Leads</span>
                    <div className=' flex items-center'>
                        <strong className=' text-xl text-gray-700 font-semibold'>2330</strong>
                        <span className=' text-sm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className=' rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
                    <IoBagHandle className=" text-2xl text-white" />
                </div>
                <div className=' pl-4'>
                    <span className=' text-sm text-gray-500 font-light'>Total Leads</span>
                    <div className=' flex items-center'>
                        <strong className=' text-xl text-gray-700 font-semibold'>2330</strong>
                        <span className=' text-sm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper> */}
            <BoxWrapper icon={<IoBagHandle />} label={"Total Leads"} firstItem={2201} secondItem={+201} bgColor={"green"} />
            <BoxWrapper icon={<IoBagHandle />} label={"Total Employee"} firstItem={23} secondItem={+1} bgColor={"#ea580c"} />
            <BoxWrapper icon={<IoBagHandle />} label={"Total Projects"} firstItem={11} secondItem={+0} bgColor={"#00C49F"} />
            <BoxWrapper icon={<IoBagHandle />} label={"Total Invoices"} firstItem={201} secondItem={+9} bgColor={"#0ea5e9"} />
        </div>
    )
}

export default DashboardStatsGrid

function BoxWrapper({ icon, label, firstItem, secondItem, bgColor }) {
    return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center' style={{ backgroundColor: bgColor }}>
        <div className=' rounded-full h-12 w-12 flex items-center justify-center bg-white'>
            <div className=" text-2xl " >{icon}</div>
        </div>
        <div className=' pl-4'>
            <span className=' text-lg font-medium text-white'>{label}</span>
            <div className=' flex items-center'>
                <strong className=' text-xl text-white font-semibold'>{firstItem}</strong>
                <span className=' text-sm text-white pl-2'>{secondItem}</span>
            </div>
        </div>
    </div>
}
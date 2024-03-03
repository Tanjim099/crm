import React, { useState } from 'react'

function LeadForm() {
    const [inquiryData, setInquiryData] = useState({
        name: "",
        email: "",
        phone: "",
        projectName: "Birla"
    });

    function handleOnChange(e) {
        const { name, value } = e.target;
        setInquiryData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    async function handleFormSubmit(e) {
        e.preventDefault()
        console.log(inquiryData)
        const res = await fetch("http://localhost:8080/api/v1/lead/submit", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inquiryData)
        });

        const content = res.json();
        // console.log(content)
    }
    return (
        <div className=' w-full h-[100vh] flex items-center justify-center bg-teal-600'>
            <form action="" onSubmit={handleFormSubmit} className='w-[350px] shadow-lg p-4 border border-teal-200 flex flex-col gap-3'>
                <h3 className=' text-center text-xl font-semibold text-white'>Lead Form</h3>
                <div className=' flex flex-col'>
                    <label className=' text-white' htmlFor="name">Name</label>
                    <input className=' p-1.5 outline-none' type="text" id='name' name='name' placeholder='enter name...' value={inquiryData.name} onChange={handleOnChange} />
                </div>
                <div className=' flex flex-col'>
                    <label className=' text-white' htmlFor="email">Email</label>
                    <input className=' p-1.5 outline-none' type="email" id='email' name='email' placeholder='enter email...' value={inquiryData.email} onChange={handleOnChange} />
                </div>
                <div className=' flex flex-col'>
                    <label className=' text-white' htmlFor="phone">Phone</label>
                    <input className=' p-1.5 outline-none' type="number" id='phone' name='phone' placeholder='enter phone...' value={inquiryData.phone} onChange={handleOnChange} />
                </div>
                <button type='submit' className=' text-white p-1.5 bg-emerald-300 mt-2'>Inquiry Now</button>
            </form>
        </div>
    )
}

export default LeadForm
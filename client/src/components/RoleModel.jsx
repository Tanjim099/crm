import React, { useState } from 'react'

function RoleModel() {
    const [roleText, setRoleText] = useState("");
    console.log(roleText)

    async function onSubmitForm(e) {
        e.preventDefault()
        console.log("clicked")
    }
    return (
        <dialog id="my_modal_2" className="modal rounded-none">
            <div className="modal-box rounded-none py-1">
                <h3 className="font-bold text-center mb-2 text-lg">Roles</h3>
                <form className='flex   items-center  gap-2'>
                    <div className='flex flex-col w-[70%]'>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            placeholder='Enter Name...'
                            className=' p-1.5 border border-black rounded-sm shadow-md'
                            value={roleText}
                            onChange={(e) => setRoleText(e.target.value)}
                        />
                    </div>
                    <div className='w-[30%]'>
                        <button type="submit" onClick={onSubmitForm} className='w-[100%] bg-green-600 text-white p-1.5'>Add Role</button>
                    </div>
                </form>
                <div className="modal-action p-0 m-1">
                    <form method="dialog p-0">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="p-0">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default RoleModel
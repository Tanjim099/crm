import React, { useState } from 'react';
import { MdOutlineRemove, MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

function TaskList({ item, editTask, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(item)
    return (
        <div className=' flex justify-between items-center gap-2 w-full'>
            {isEditing ? (
                <input
                    type="text"
                    name='taskList'
                    id='taskList'
                    placeholder='Enter Task List...'
                    className=' p-1.5 border border-gray-500 rounded-sm w-full'
                    value={editingItem}
                    onChange={(e) => setEditingItem(e.target.value)}
                />
            ) : (
                <p className=' p-1.5 border border-gray-500 rounded-sm w-full'>{item}</p>
            )}
            <button className=' bg-white p-2.5 text-black  rounded-sm' onClick={(e) => {
                e.preventDefault()
                setIsEditing(!isEditing)
                if (editingItem == "") return
                editTask(editingItem)
            }} style={{ boxShadow: "inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)" }}>{isEditing ? <FaSave /> : <MdEdit />}</button>
            <button className=' bg-white p-2.5 text-black  rounded-sm' onClick={deleteTask} style={{ boxShadow: "inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)" }}><MdOutlineRemove /></button>
        </div>
    )
}

export default TaskList
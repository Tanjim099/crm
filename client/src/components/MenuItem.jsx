import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuList from './MenuList';

function MenuItem({ menuItem, isActive, setIsActive }) {
    function handleOnClick(e) {
        e.preventDefault()
        setIsActive(() => menuItem.id)
    }
    return (
        <li className='  px-2 py-1 rounded-sm text-sm' onClick={handleOnClick} style={{ backgroundColor: isActive == menuItem.id ? "red" : "transparent" }}>
            <NavLink
                to={menuItem.path}

                className="flex items-center gap-2">
                <menuItem.icon />
                {menuItem.label}
            </NavLink>
        </li>
    )
}

export default MenuItem
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuList from './MenuList';

function MenuItem({ menuItem, isActive, setIsActive }) {
    // console.log(isActive);
    // to={menuItem.path}
    return (
        <li className='  px-2 py-1 rounded-sm text-sm' onClick={() => setIsActive(menuItem.id)} style={{ backgroundColor: isActive == menuItem.id ? "red" : "transparent" }}>
            <NavLink
                to={menuItem.path}

                className="flex items-center gap-2">
                <menuItem.icon />
                {menuItem.label}
            </NavLink>
            {/* {menuItem && menuItem.children && menuItem.children.length > 0 ? <MenuList menuList={menuItem.children} /> : null} */}
        </li>
    )
}

export default MenuItem
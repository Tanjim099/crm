import React, { useState } from 'react'
import MenuItem from './MenuItem'

function MenuList({ menuList }) {
    const [isActive, setIsActive] = useState(menuList[0]?.id);
    return (
        <ul className='flex flex-col gap-2'>
            {
                menuList && menuList.map((item, i) => (
                    <MenuItem key={i} menuItem={item} isActive={isActive} setIsActive={setIsActive} />
                ))
            }
        </ul>
    )
}

export default MenuList
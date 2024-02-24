import React from 'react'
import Layout from '../components/Layout';
import { FaPlus } from "react-icons/fa";
import Dropdown from '../components/Dropdonw';

function Task() {
    return (
        <Layout>
            <div>
                <div className=' bg-white p-3 flex justify-between items-center border border-gray-200'>
                    <div>
                        <h3 className=' text-2xl font-semibold'>Task (0)</h3>
                    </div>
                    <div className=' flex gap-2'>
                        <div className='flex relative'>
                            <img className=' w-[40px] h-[40px] rounded-full relative' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944" alt="" />
                            <img className=' w-[40px] h-[40px] rounded-full relative' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944" alt="" />
                            <img className=' w-[40px] h-[40px] rounded-full relative' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944" alt="" />
                        </div>
                        <button className='bg-blue-600 text-white p-2 flex items-center gap-1'><FaPlus /> <span>Add Task</span></button>
                    </div>
                </div>
                <div className='bg-white p-3 flex flex-col justify-between gap-3 border border-gray-200 mt-5 relative'>
                    <div className='flex justify-between'>
                        <h2 className=' text-lg font-medium'>Task Title</h2>
                        {/* <b>...</b> */}
                    </div>
                    <div className=' absolute right-5 top-1 font-bold text-xl cursor-pointer'>
                        <Dropdown>
                            <button className="block px-4 py-2 text-sm text-black w-full text-left hover:bg-gray-100 hover:text-gray-900 "
                                role="menuitem">Edit</button>
                            <button
                                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Delete
                            </button>
                        </Dropdown>
                    </div>
                    <div className=' flex'>
                        <div className=' w-[80%] flex  flex-col gap-3'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum omnis asperiores exercitationem labore facilis maxime,
                                debitis provident rem voluptatum consectetur, recusandae ipsum, obcaecati ab? Quaerat distinctio facere cum modi accusamus
                                reiciendis quia ipsum optio repudiandae nostrum error, nihil earum!
                            </p>
                            <div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" />
                                    <label htmlFor="">Task 1</label>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" />
                                    <label htmlFor="">Task 1</label>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" />
                                    <label htmlFor="">Task 1</label>
                                </div>

                            </div>
                        </div>
                        <div className=' w-[20%] grid grid-cols-2 gap-2'>
                            <img className='w-[120px]' src="https://imgix-blog.setapp.com/dropshare-screenshoting.webp?auto=format&ixlib=php-3.3.1&q=75" alt="" />
                            <img className='w-[120px]' src="https://imgix-blog.setapp.com/dropshare-screenshoting.webp?auto=format&ixlib=php-3.3.1&q=75" alt="" />
                            <img className='w-[120px]' src="https://imgix-blog.setapp.com/dropshare-screenshoting.webp?auto=format&ixlib=php-3.3.1&q=75" alt="" />
                            <img className='w-[120px]' src="https://imgix-blog.setapp.com/dropshare-screenshoting.webp?auto=format&ixlib=php-3.3.1&q=75" alt="" />

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Task
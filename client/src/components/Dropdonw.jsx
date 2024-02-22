import React, { useState } from 'react';

const Dropdown = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // className="fixed inset-0 bg-black opacity-25"
    //                     onClick={handleOutsideClick}
    const handleOutsideClick = () => {
        setIsOpen(false)
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={toggleDropdown}

                >
                    ...
                </button>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-[100px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50" >
                    {isOpen ? (
                        <div
                            className="py-1 inset-0 opacity-25"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                            onClick={handleOutsideClick}
                        >
                            {children}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

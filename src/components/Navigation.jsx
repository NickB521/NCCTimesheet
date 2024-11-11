import React, { useState } from 'react';

const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const togglenavigation = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className={`navigation ${isOpen ? 'open' : ''}`}>
            <div id="pointer">
                <img src="src/assets/svgs/pointer.svg" alt="" />
            </div><div id="pages">
                <div className={`page-line ${isOpen ? 'open' : ''}`}>
                    <div className="img-container">
                        <img src="src/assets/svgs/dashboard.svg" alt="" id="active"/>
                    </div>
                    <p>Dashboard</p>
                </div>
                <div className={`page-line ${isOpen ? 'open' : ''}`}>
                    <div className="img-container">
                        <img src="src/assets/svgs/calendar.svg" alt="" />
                    </div>
                    <p>Calander</p>
                </div>
            </div>
            <div id="dropdown-container">
                <button onClick={togglenavigation}>
                    <img src="src/assets/svgs/dropdown.svg" alt="" className={`dropdown-navigation ${isOpen ? 'open' : ''}`}/>
                </button>
            </div>
        </div>
    );
}

export default Navigation;
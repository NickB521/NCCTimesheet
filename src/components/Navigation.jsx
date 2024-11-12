import React, { useState } from "react";

import { Dashboard, Calendar } from "../assets/icons/navigation";

const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const togglenavigation = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className={`navigation ${isOpen ? "open" : ""}`}>
            <div id="pages">
                <div className={`page-line ${isOpen ? "open" : ""}`} >
                    <div className="img-container">
                        <Dashboard alt="" id="active"/>
                    </div>
                    <p>Dashboard</p>
                </div>
                <div className={`page-line ${isOpen ? "open" : ""}`}>
                    <div className="img-container">
                        <Calendar alt="" />
                    </div>
                    <p>Calander</p>
                </div>
            </div>
            <div id="dropdown-container" className="hover-interaction">
                <button onClick={togglenavigation}>
                    <img src="src/assets/icons/dropdown.svg" alt="" className={`dropdown-navigation ${isOpen ? "open" : ""}`}/>
                </button>
            </div>
        </div>
    );
}

export default Navigation;
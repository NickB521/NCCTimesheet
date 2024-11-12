import React, { useState } from "react";

import { Dashboard, Calendar } from "../assets/icons/navigation";
import { DropdownIcon } from "../assets/icons";

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    const NavigationButton = ({ name, icon }) => {
        return (
            <div className={ `page-line ${ expanded ? "open" : "" }` }>
                <div className="img-container">
                    { icon }
                </div>
                <p>{ name }</p>
            </div>
        );
    }

    return (
        <div className={ `navigation ${ expanded ? "open" : "" }` }>
            <div id="pages">
                <NavigationButton name={ 'Dashboard' } icon={ <Dashboard alt=""/> } />
                <NavigationButton name={ 'Calendar' } icon={ <Calendar alt=""/> } />
            </div>

            <div id="dropdown-container" className="hover-interaction">
                <button onClick={ toggleExpanded }>
                    <DropdownIcon alt="" className={ `dropdown-navigation ${ expanded ? "open" : "" }` }/>
                </button>
            </div>
        </div>
    );
}

export default Navigation;
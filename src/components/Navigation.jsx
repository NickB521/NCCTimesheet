import React, { useState} from "react";

import { Dashboard, Calendar } from "../assets/icons/navigation";
import { DropdownIcon } from "../assets/icons";

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    const NavigationButton = ({ name, icon }) => {
        return (
            <div id="page-navigation-line">
                <div id="page-navigation-img-container">
                    { icon }
                </div>
                <p>
                    { name }
                </p>
            </div>
        );
    }

    return (
        <div className={ `navigation ${ expanded ? "open" : "" }` }>
            <div id="page-navigation">
                <NavigationButton name={ 'Dashboard' } icon={ <Dashboard alt=""/> } />
                <NavigationButton name={ 'Calendar' } icon={ <Calendar alt=""/> } />
            </div>

            <div id="dropdown-container" className="cursor-pointer">
                <button onClick={ toggleExpanded }>
                    <DropdownIcon alt="" className={ `navigation-icon ${ expanded ? "open" : "" }` }/>
                </button>
            </div>
        </div>
    );
}

export default Navigation;
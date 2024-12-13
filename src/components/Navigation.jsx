import React, { useState } from "react";

import { Dashboard, Calendar, Pointer } from "../assets/icons/navigation";
import { DropdownIcon } from "../assets/icons";

import { useLocation, Link } from "react-router-dom";

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    const NavigationButton = ({ name, icon, page }) => {
        return (
            <Link to={ page }>
                <div id="page-navigation-line" className={ location.pathname != page ? "inactive" : "active" }>
                    { location.pathname != page
                        ? <></>
                        : <Pointer id='page-navigation-pointer' /> }

                    <div id="page-navigation-img-container">
                        { icon }
                    </div>
                    <p>
                        { name }
                    </p>
                </div>
            </Link>
        );
    }

    return (
        (location.pathname == '/sign-in' || location.pathname == '/sign-up')
        ? <></>
        : <div className={ `navigation ${ expanded ? "open" : "" }` }>
            <div id="page-navigation">
                <NavigationButton 
                    name={ 'Dashboard' } 
                    icon={ <Dashboard alt="" color={ "#292F36" } /> } 
                    page={ "/" } 
                />

                <NavigationButton 
                    name={ 'Calendar' } 
                    icon={ <Calendar alt="" color={ "#292F36" } /> } 
                    page={ "/calendar" } 
                />
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
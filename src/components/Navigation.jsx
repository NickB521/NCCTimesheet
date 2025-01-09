import React, { useState } from "react";

import { Dashboard, Calendar, Pointer } from "../assets/icons/navigation";
import { DropdownIcon } from "../assets/icons";

import { useLocation, Link } from "react-router-dom";

const Navigation = (props) => {
    console.log(useLocation().pathname)
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    const NavigationButton = ({ name, icon, page }) => {
        return (
            <Link to={ page }>
                <div id="page-navigation-line" className={ useLocation().pathname != page ? "inactive" : "active" }>
                    { useLocation().pathname != page
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
        (useLocation().pathname == '/sign-in' || useLocation().pathname == '/sign-up')
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
const Navigation = () => {
    return(
        <div id="navigation">
            <div id="pointer">
                <img src="src/assets/svgs/pointer.svg" alt="" />
            </div>
            <div id="pages">
                <img src="src/assets/svgs/dashboard.svg" alt="" id="active"/>
                <img src="src/assets/svgs/calendar.svg" alt="" />
            </div>
            <div id="dropdown-container">
                <img src="src/assets/svgs/dropdown.svg" alt="" id="dropdown-navigation"/>
            </div>
        </div>
    );
}

export default Navigation;
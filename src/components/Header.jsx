const Header = () => {
    return(
        <div id="header">
            <div id="header-title">
                <img src="src/assets/logo.png" alt="" id="logo" />
                <p>Dashboard</p>
            </div>
            <div id="header-caption">
                <div id="utilities">
                    <img src="src/assets/svgs/notifications.svg" alt=""/>
                    <img src="src/assets/svgs/faq.svg" alt=""/>
                    <img src="src/assets/svgs/seperator.svg" alt="" />
                </div>
                <div id="profile">
                    <img src="src/assets/svgs/pfp.svg" alt=""/>
                    <p>Full Name</p>
                    <img src="src/assets/svgs/dropdown.svg" alt="" id="dropdown-header"/>
                </div>

            </div>
        </div>
    );
}

export default Header;
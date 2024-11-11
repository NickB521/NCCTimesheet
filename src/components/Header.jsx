import { TestIcon } from "./TestIcon";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";

const Header = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

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
                    <div>
                    <Dropdown id="Dropdown">
                        <DropdownTrigger>
                            <div id="profile">
                                <img src="src/assets/svgs/pfp.svg" alt=""/>
                                <p>Full Name</p>
                                <img src="src/assets/svgs/dropdown.svg" alt="" id="dropdown-header"/>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(key) => alert(key)} variant="bordered">
                            <DropdownItem
                                className="text-danger"
                                color="danger"
                                startContent={<TestIcon className={cn(iconClasses, "text-danger")} />}
                            >
                                Sign Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Header;
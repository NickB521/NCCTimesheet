import { TestIcon } from "../assets/svgs/TestIcon";
import {NotificationIcon} from "../assets/svgs/NotificationIcon";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn, Badge, Button, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import React, { useState } from "react";

const Header = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [notificationCount, SetNotificationCount] = useState(10);
    
    return(
        <div id="header">
            <div id="header-title">
                <img src="src/assets/logo.png" alt="" id="logo" />
                <p>Dashboard</p>
            </div>
            <div id="header-caption">
                <div id="utilities">
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <span className="hover-interaction" id="notification">
                                <Badge content={notificationCount} shape="circle" color="danger">
                                    <NotificationIcon size={26} />
                                </Badge>
                            </span>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                            <div className="text-small font-bold">Popover Content</div>
                            <div className="text-tiny">This is the popover content</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    
                    <img src="src/assets/svgs/faq.svg" alt=""/>
                    <img src="src/assets/svgs/seperator.svg" alt="" />
                </div>
                    <div>
                    <Dropdown id="Dropdown">
                        <DropdownTrigger>
                            <div id="profile" className="hover-interaction">
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
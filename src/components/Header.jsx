import { 
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, 
    Badge, Popover, PopoverTrigger, PopoverContent, Tabs, 
    Tab, ScrollShadow, Tooltip
} from "@nextui-org/react";

import React, { useState } from "react";

import { Avatar, NotificationBadge, Seperator, Faq } from "../assets/icons/header";
import { TestIcon, DropdownIcon } from "../assets/icons";

import { items, items2 } from "../assets/data/notification-data"; 

const Header = () => {
    const [notificationCount, setNotificationCount] = useState(items.length);
    const [color, setColor] = useState("default");

    const FAQ = () => {
        return (
            <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                    <span className="hover-interaction utility-content">
                        <Faq size={26}></Faq>
                    </span>
                </PopoverTrigger>

                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">FAQ</div>
                        <div className="text-tiny">Test Test Test Test</div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }    

    const Notification = () => {
        return(
            <>
                <Popover placement="bottom" showArrow={ true }>
                    <PopoverTrigger>
                        <span className="hover-interaction utility-content">
                            <Badge content={ notificationCount } shape="circle" color="danger">
                                <NotificationBadge size={26} />
                            </Badge>
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px]">
                        <div className="flex w-full flex-col">
                            <h4 className="text-medium font-medium" id="notification-title">
                                Notifications
                            </h4>
                            <div className="flex w-full flex-col">
                                <Tabs id="header-menu-fix">
                                    <Tab key="unread" title="Unread">
                                        <ScrollShadow size={100} className="scroll-bar">
                                            <ul className="flex-col">
                                                <NotificationListItems list={ items }/>
                                            </ul>
                                        </ScrollShadow>    
                                    </Tab>
                                    <Tab key="read" title="Read">
                                        <ScrollShadow size={100} className="scroll-bar">
                                            <ul>
                                                <NotificationListItems list={ items2 }/>
                                            </ul>
                                        </ScrollShadow> 
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>    
                    </PopoverContent>
                </Popover>
            </>
        );
    }

    const NotificationListItems = ( { list } ) => {
        return (

            list.map((item, index) =>
                {console.log(index)
                    return(
                <Tooltip isDisabled={item.description.length > 12 ? false : true} showArrow placement="right" offset={25} closeDelay={0} content={
                    <div className="px-1 py-2">
                        <div className="text-small font-bold text-center">Note</div>
                        <div className="text-tiny text-left break-words pt-5 rounded-md w-32" style={{width: "125px"}}>{item.description}</div>
                    </div>
                }>
                    <div className="px-1 py-1 cursor-pointer">
                        <li key={ index } id="list-item-fix" className={`flex p3 text-${item.color}`}>
                            <div>
                                <TestIcon></TestIcon>
                            </div>
                            <div>
                                <p className="text-small font-bold"> {item.label} </p>
                                <p className="text-tiny"> { item.description.length > 12 ? item.description.substring(0, 12) + "..." : item.description } </p>
                            </div>
                        </li>    
                    </div>
                </Tooltip>)}
            )  
        );
    }

    const Profile = () => {
        return(
            <>
                <Dropdown id="Dropdown">
                    <DropdownTrigger>
                        <div id="profile" className="hover-interaction">
                            <Avatar alt=""/>
                            <p>Full Name</p>
                            <DropdownIcon alt="" id="dropdown-header"/>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu onAction={ (key) => alert(key) } variant="solid">
                        <DropdownItem
                            className="text-danger"
                            color="danger"
                            startContent={ <TestIcon/> }
                        >
                            Sign Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        );
    }

    return (
        <div id="header">
            <div id="header-title">
                <img src="src/assets/logo.png" id="logo" />
                <p>Dashboard</p>
            </div>

            <div id="header-caption">
                <div id="utilities">
                    <Notification/>
                    <FAQ />
                    <Seperator id="barrier"/>
                </div>
                <div>
                    <Profile/>
                </div>
            </div>
        </div>
    );
}

export default Header;
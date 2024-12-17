import { 
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, 
    Badge, Popover, PopoverTrigger, PopoverContent, Tabs, 
    Tab, ScrollShadow, Tooltip
} from "@nextui-org/react";

import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { Avatar, NotificationBadge, Seperator, Faq, Logout } from "../assets/icons/header";
import { DropdownIcon } from "../assets/icons";

import { items, items2 } from "../assets/data/notification-data"; 

const Header = () => {
    const [notificationCount, setNotificationCount] = useState(items.length);
    const location = useLocation();

    const getPageName = () => {
        let name = location.pathname;
        if (name == "/") return "Dashboard";
        return name
            .substring(1)
            .replace(/(^|\-)([a-z])/g, (_, separator, letter) => separator + letter.toUpperCase())
            .replace('-', ' ');
    }

    const FAQ = () => {
        return (
            (location.pathname == '/sign-in' || location.pathname == '/sign-up')
            ? <></>
            : <Popover placement="bottom" showArrow={true} style={{marginTop: "10px"}}>
                <PopoverTrigger>
                    <span className="cursor-pointer navigation-utility-content">
                        <Faq size={26}></Faq>
                    </span>
                </PopoverTrigger>

                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-medium font-medium text-center">FAQ</div>
                        <div className="text-tiny text-left break-words pt-5 rounded-md">Coming Soon...</div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }    

    const Notification = () => {
        return(
            (location.pathname == '/sign-in' || location.pathname == '/sign-up')
            ? <></>
            : <>
                <Popover placement="bottom" showArrow={ true } style={{marginTop: "10px"}}>
                    <PopoverTrigger>
                        <span className="cursor-pointer navigation-utility-content">
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
                                        <NotificationListItems list={items} />
                                    </Tab>
                                    <Tab key="read" title="Read">
                                        <NotificationListItems list={items2} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>    
                    </PopoverContent>
                </Popover>
            </>
        );
    }

    const setActiveNotification = (item) => {

        const notificationItems = {
            day: item.day,
            month: item.month,
            year: item.year,
        }

        sessionStorage.setItem('activeNotification', JSON.stringify(notificationItems));
        console.log(sessionStorage.getItem('activeNotification'));
    };

    const NotificationListItems = ({ list }) => {
        return (
            <ScrollShadow size={100} id="scroll-bar">
                <ul>
                    {list.map((item, index) => (
                        <Tooltip
                            key={index}
                            isDisabled={item.description.length <= 12}
                            showArrow
                            placement="right"
                            offset={25}
                            closeDelay={0}
                            content={
                                <div className="px-1 py-2">
                                    <div className="text-small font-bold text-center">Note</div>
                                    <div className="text-tiny text-left break-words pt-5 rounded-md" style={{ width: "125px" }}>
                                        {item.description}
                                    </div>
                                </div>
                            }
                        >
                            <Link 
                                to="/calendar" 
                                onClick={() => {
                                    setActiveNotification(item);
                                    if (window.location.pathname === "/calendar") {
                                        window.location.reload();
                                    }
                                }}
                            >
                                <div className="px-1 py-1 cursor-pointer">
                                    <li id="notification-list-item-fix" className={`text-${item.color} flex p3`}>
                                        <div>{item.icon}</div>
                                        <div>
                                            <p className="text-small font-bold text-current">{item.label}</p>
                                            <p className="text-tiny text-current">
                                                {item.description.length > 12 ? `${item.description.substring(0, 12)}...` : item.description}
                                            </p>
                                        </div>
                                    </li>
                                </div>
                            </Link>
                        </Tooltip>
                    ))}
                </ul>
            </ScrollShadow>
        );
    };

    const Profile = () => {
        return(
            (location.pathname == '/sign-in' || location.pathname == '/sign-up')
            ? <></>
            : <>
                <Dropdown id="Dropdown">
                    <DropdownTrigger>
                        <div id="profile" className="cursor-pointer">
                            <Avatar alt=""/>
                            <p>Full Name</p>
                            <DropdownIcon alt="" id="dropdown-header"/>
                        </div>
                    </DropdownTrigger>
                    <Link to="/sign-in">
                        <DropdownMenu variant="solid">
                            <DropdownItem 
                                id="page-navigation-line"
                                className="text-danger"
                                color="danger"
                                startContent={ <Logout/> }
                            >
                                Sign Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Link>
                </Dropdown>
            </>
        );
    }

    return (
        <div id="header">
            <div id="header-title">
                <img src="src/assets/logo.png" id="logo" />
                { (location.pathname == '/sign-in' || location.pathname == '/sign-up')
                ? <></>
                : <p>{ getPageName() }</p> }
            </div>

            <div id="header-caption">
                <div id="utilities">
                    <Notification/>
                    <FAQ />
                    { (location.pathname == '/sign-in' || location.pathname == '/sign-up')
                    ? <></>
                    : <Seperator id="barrier"/> }
                </div>
                <div>
                    <Profile/>
                </div>
            </div>
        </div>
    );
}

export default Header;
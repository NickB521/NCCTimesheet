import { TestIcon } from "../assets/svgs/TestIcon";
import {NotificationIcon} from "../assets/svgs/NotificationIcon";
import { Faq } from "../assets/svgs/faq";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge, Popover, PopoverTrigger, PopoverContent, Tabs, Tab, Listbox, ListboxItem, ScrollShadow} from "@nextui-org/react";
import React, { useState } from "react";

const Header = () => {
    const [notificationCount, SetNotificationCount] = useState(10);

    const items = [
        {
          key: "new",
          color: "default",
          label: "New file",
          icon: <TestIcon/>,
          className: "text-default",
          description: "thingy"
        },
        {
          key: "copy",
          color: "success",
          label: "Copy link",
          icon: <TestIcon/>,
          className: "text-success",
          description: "thingy"
        },
        {
          key: "edit",
          color: "warning",
          label: "Edit file",
          icon: <TestIcon/>,
          className: "text-warning",
          description: "thingy"
        },
        {
          key: "declined",
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          key: "declined",
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          key: "declined",
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          key: "declined",
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        }
    ];

    const items2 = [
        {
          key: "copy",
          color: "success",
          label: "Copy link",
          icon: <TestIcon/>,
          className: "text-success",
          description: "thingy"
        },
        {
          key: "copy",
          color: "success",
          label: "Copy link",
          icon: <TestIcon/>,
          className: "text-success",
          description: "thingy"
        },
        {
          key: "declined",
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          key: "declined",
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          key: "declined",
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
    ];

    /* try to incorporate a tool tip function to this menu */

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
                            <span className="hover-interaction utility-content">
                                <Badge content={notificationCount} shape="circle" color="danger">
                                    <NotificationIcon size={26} />
                                </Badge>
                            </span>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            <div className="flex w-full flex-col">
                                <h4 className="text-medium font-medium" id="notification-title">
                                    Notifications
                                </h4>
                                <div className="flex w-full flex-col">
                                    <Tabs aria-label="Options" id="nav-menu-fix">
                                        <Tab key="unread" title="Unread">
                                            <ScrollShadow id="scroll-bar" hideScrollBar size={100}>
                                                <Listbox
                                                    items={items}
                                                    aria-label="Dynamic Actions"
                                                    onAction={(key) => alert(key)}
                                                >
                                                    {(item) => (
                                                        <ListboxItem
                                                            key={item.key}
                                                            startContent={item.icon} 
                                                            description={item.description}
                                                            color={item.color}
                                                            className={item.className}
                                                        >
                                                            {item.label}
                                                        </ListboxItem>
                                                    )}
                                                </Listbox>
                                            </ScrollShadow>
                                        </Tab>
                                        <Tab key="read" title="Read">
                                            <ScrollShadow id="scroll-bar" hideScrollBar size={100}>
                                                <Listbox
                                                    items={items2}
                                                    aria-label="Dynamic Actions"
                                                    onAction={(key) => alert(key)}
                                                >
                                                    {(item) => (
                                                        <ListboxItem
                                                            key={item.key}
                                                            startContent={item.icon} 
                                                            description={item.description}
                                                            color={item.color}
                                                            className={item.className}
                                                        >
                                                            {item.label}
                                                        </ListboxItem>
                                                    )}
                                                </Listbox>
                                            </ScrollShadow>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>    
                        </PopoverContent>
                    </Popover>
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <span className="hover-interaction utility-content">
                                <Faq size={26}></Faq>
                            </span>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small font-bold">Notifications</div>
                                <div className="text-tiny">This is the popover content</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <img src="src/assets/svgs/seperator.svg" alt="" id="barrier"/>
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
                        <DropdownMenu onAction={(key) => alert(key)} variant="solid">
                            <DropdownItem
                                className="text-danger"
                                color="danger"
                                startContent={<TestIcon/>}
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
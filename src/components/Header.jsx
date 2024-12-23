import { TestIcon } from "../assets/svgs/TestIcon";
import {NotificationIcon} from "../assets/svgs/NotificationIcon";
import { Faq } from "../assets/svgs/faq";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge, Popover, PopoverTrigger, PopoverContent, Tabs, Tab, Listbox, ListboxItem, ScrollShadow} from "@nextui-org/react";
import React, { useState, useCallback} from "react";

const Header = () => {

    const items = [
        {
          color: "default",
          label: "New file",
          icon: <TestIcon/>,
          className: "text-default",
          description: "thingy3123"
        },
        {
          color: "success",
          label: "Copy link",
          icon: <TestIcon/>,
          className: "text-success",
          description: "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
        },
        {
          color: "warning",
          label: "Edit file",
          icon: <TestIcon/>,
          className: "text-warning",
          description: "thingydqdqthingydqdqthingy"
        },
        {
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy7674"
        },
        {
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy56gs"
        },
        {
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy43gsdf"
        },
        {
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy4543fg3"
        },
        {
            color: "danger",
            label: "Delete file",
            className: "text-danger",
            icon: <TestIcon/>,description: "thingy4543fg3"
        }
    ];

    const items2 = [
        {
          color: "success",
          label: "Copy link",
          icon: <TestIcon/>,
          className: "text-success",
          description: "thingythingythingythingythingythingythingythingythingythingy"
        },
        {
          color: "success",
          label: "Copy link",
          icon: <TestIcon/>,
          className: "text-success",
          description: "thingy"
        },
        {
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          color: "danger",
          label: "Delete file",
          className: "text-danger",
          icon: <TestIcon/>,
          description: "thingy"
        },
        {
          color: "warning",
          label: "Edit file",
          icon: <TestIcon/>,
          className: "text-warning",
          description: "thingydqdqthingydqdqthingy"
        },
        {
          color: "warning",
          label: "Edit file",
          icon: <TestIcon/>,
          className: "text-warning",
          description: "thingydqdqthingydqdqthingy"
        }
    ];

    const [notificationCount, SetNotificationCount] = useState(items.length);

    {/*
        Code for ToolTip    
    */}

    const [hoveredItem, setHoveredItem] = useState(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = useCallback((event, item) => {
        let description = item.description.length > 50 
            ? item.description.substring(0, 50) + "..."
            : item.description.length > 12
                ? item.description  
                : "";
        setHoveredItem({ ...item, description });  
        const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
        const adjustedPosition = {
            top: top + height / 2  - 45,
            left: left - width + 275, 
        };
        setPosition(adjustedPosition);
        setTooltipHeight(tooltipHeight);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredItem(null);
    }, []);

    {/*
        End Code for ToolTip    
    */}

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
                                    <Tabs id="nav-menu-fix">
                                        <Tab key="unread" title="Unread">
                                            <ScrollShadow size={100} className="scroll-bar">
                                                <Listbox
                                                    items={items}
                                                    onAction={(key) => alert(key)}
                                                    className="notification-gap-fix"
                                                >
                                                    {items.map((item, index) => (
                                                        <ListboxItem
                                                            key={index}
                                                            startContent={item.icon} 
                                                            description={item.description.length > 10 ? item.description.substring(0, 10) + "..." : item.description}
                                                            color={item.color}
                                                            className={item.className}
                                                            onMouseEnter={(e) => handleMouseEnter(e, item)}
                                                            onMouseLeave={handleMouseLeave}
                                                        >
                                                            {item.label}
                                                        </ListboxItem>
                                                    ))}
                                                </Listbox>
                                            </ScrollShadow>
                                        </Tab>
                                        <Tab key="read" title="Read">
                                            <ScrollShadow size={100}className="scroll-bar">
                                                <Listbox
                                                    items2={items2}
                                                    onAction={(key) => alert(key)}
                                                    className="notification-gap-fix"
                                                >
                                                    {items2.map((item, index) => (
                                                        <ListboxItem
                                                            key={index}
                                                            startContent={item.icon} 
                                                            description={item.description.length > 10 ? item.description.substring(0, 10) + "..." : item.description}
                                                            color={item.color}
                                                            className={item.className}
                                                            onMouseEnter={(e) => handleMouseEnter(e, item)}
                                                            onMouseLeave={handleMouseLeave}
                                                        >
                                                            {item.label}
                                                        </ListboxItem>
                                                    ))}
                                                </Listbox>
                                            </ScrollShadow>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>    
                        </PopoverContent>
                    </Popover>
                    {hoveredItem && hoveredItem.description && hoveredItem.description.length > 0 && (
                        <div id="tooltip" style={{top: position.top, left: position.left}}>
                            <img src="src/assets/svgs/dropdown.svg" id="tooltip-dropdown"/>
                            <h4 id="tooltip-note">Note</h4>
                            <p>{hoveredItem.description}</p>
                        </div>
                    )}
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
import React, { useState, useEffect, useRef, useContext } from "react";
import Greeting from "/src/components/Greeting.jsx";
import HolidayList from "/src/components/HolidayList";
import AnnouncementList from "/src/components/AnnouncementList";
import TimesheetCard from "/src/components/TimesheetCard";
import PoliciesCard from "../../../components/PoliciesCard";
import ContactCard from "../../../components/ContactCard";
import { employeeTimesheet, employeeResubmitted } from "../../../assets/data/dashboard-timesheet-data";
import { holidays as holidayData } from "../../../assets/data/holiday-data";
import { announcements as announcementData } from "../../../assets/data/announcement-data";
import { supervisorInformation, coordinatorInformation } from "../../../assets/data/dashboard-contact-information";
import { UpArrow, DownArrow } from "../../../assets/icons/dashboard";
import { Button } from "@nextui-org/react";
import Context from "../../../components/Context";

const Dashboard = () => {
  const [loopCount, setLoopCount] = useState(0);
  const policy = "policy";
  const contentRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const {token, setToken} = useContext(Context); //THIS MAY NOT BE NEEDED DEPENDING ON CONTEXT AND OTHER DATA FLOW
  const {user, setUser} = useContext(Context);

  useEffect(() => {
    const updateLoopCount = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight < 900) setLoopCount(2);
      else setLoopCount(3);
    };

    updateLoopCount();
    window.addEventListener("resize", updateLoopCount);

    return () => window.removeEventListener("resize", updateLoopCount);
  }, []);

  const scrollUp = () => {
    if (contentRef.current) {
      const newScrollPosition = Math.max(scrollPosition - 355, 0);
      setScrollPosition(newScrollPosition);
      contentRef.current.scrollTop = newScrollPosition;
      setIsAtTop(newScrollPosition === 0);
      setIsAtBottom(false);
    }
  };
  
  const scrollDown = () => {
    if (contentRef.current) {
      const maxScrollPosition = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const newScrollPosition = Math.min(scrollPosition + 355, maxScrollPosition);
      setScrollPosition(newScrollPosition);
      contentRef.current.scrollTop = newScrollPosition;
      setIsAtTop(false);
      setIsAtBottom(newScrollPosition >= maxScrollPosition);
    }
  };

  return (
    <div id="dashboard">
      <Greeting name={user.firstName} />
      <div id="dashboard-body">
        <div id="main-card">
          <h1 className="widget-title" style={{fontSize:"30px"}}>Timesheets</h1>
          <h2 className="dashboard-subtitle">Recent Timesheets</h2>
          {employeeTimesheet.slice(0, loopCount).map((item, index) => (
            <TimesheetCard
              key={index}
              title={item.title} 
              hours={item.hours} 
            />
          ))}

          <h2 className="dashboard-subtitle">Past Timesheets</h2>
          {employeeResubmitted.slice(0, loopCount).map((item, index) => (
            <TimesheetCard
              key={index}
              title={item.title}
              hours={item.hours}
            />
          ))}
          <button id="timesheet-button">View All Timesheets</button>
        </div>

        <div id="side-cards">
          <Button className={`scroll-pointer ${isAtTop ? 'disabled-arrow' : ''}`} style={{margin: "0px 0px 10px"}} onClick={scrollUp}>
            <UpArrow/>
          </Button>
          <div id="scroll" ref={contentRef}>
            <HolidayList holidays={holidayData} isEditable={false}/>
            <AnnouncementList announcements={announcementData} isEditable={false}/>
            <ContactCard groups={[supervisorInformation, coordinatorInformation]}/>
            <PoliciesCard policy={policy} isEditable={false}/>
          </div>
          <Button className={`scroll-pointer ${isAtBottom ? 'disabled-arrow' : ''}`} style={{margin: "10px 0px 0px"}} onClick={scrollDown}>
            <DownArrow/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect, useRef,useContext} from "react";
import { supervisorTimesheet, supervisorResubmitted } from "../../../assets/data/dashboard-timesheet-data";
import Greeting from "/src/components/Greeting.jsx";
import TimesheetCard from "/src/components/TimesheetCard";
import HolidayParent from "../../../components/HolidayParent";
import AnnouncementParent from "../../../components/AnnouncementParent";
import ContactCard from "../../../components/ContactCard";
import PoliciesCard from "../../../components/PoliciesCard";
import { supervisorInformation, coordinatorInformation } from "../../../assets/data/dashboard-contact-information";
import { UpArrow, DownArrow } from "../../../assets/icons/dashboard";
import { Button } from "@nextui-org/react";
import Context from "../../../components/Context";

// work on later
const setActiveNotification = (item) => {

  const notificationItems = {
      day: item.day,
      month: item.month,
      year: item.year,
  }

  sessionStorage.setItem('activeNotification', JSON.stringify(notificationItems));
  console.log(sessionStorage.getItem('activeNotification'));
};
// 

const SupervisorDashboard = () => {
  const [loopCount, setLoopCount] = useState(0);
  const [policy, setPolicy] = useState("policy");
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
          {supervisorTimesheet.slice(0, loopCount).map((item, index) => (
            <TimesheetCard
              key={index}
              title={item.title} 
              hours={item.hours} 
            />
          ))}

          <h2 className="dashboard-subtitle">Resubmitted Timesheets</h2>
          {supervisorResubmitted.slice(0, loopCount).map((item, index) => (
            <TimesheetCard
              key={index}
              title={item.title}
              hours={item.hours}
              newHours={item.resubmittedHours}
            />
          ))}
          <button id="timesheet-button">View All Timesheets</button>
        </div>
        
        <div id="side-cards">
          <Button className={`scroll-pointer ${isAtTop ? 'disabled-arrow' : ''}`} style={{margin: "0px 0px 10px"}} onClick={scrollUp}>
            <UpArrow/>
          </Button>
          <div id="scroll" ref={contentRef}>
            <HolidayParent/>
            <AnnouncementParent/>
            <ContactCard groups={[supervisorInformation, coordinatorInformation]}/>
            <PoliciesCard policy={policy} setPolicy={setPolicy} isEditable={true}/>
          </div>
          <Button className={`scroll-pointer ${isAtBottom ? 'disabled-arrow' : ''}`} style={{margin: "10px 0px 0px"}} onClick={scrollDown}>
            <DownArrow/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
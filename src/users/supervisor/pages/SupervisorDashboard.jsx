import React, { useState, useEffect } from "react";
import { supervisorTimesheet, supervisorResubmitted } from "../../../assets/data/dashboard-timesheet-data";
import Greeting from "/src/components/Greeting.jsx";
import TimesheetCard from "/src/components/TimesheetCard";
import HolidayParent from "../../../components/HolidayParent";
import AnnouncementParent from "../../../components/AnnouncementParent";
import ContactCard from "../../../components/ContactCard";
import PoliciesCard from "../../../components/PoliciesCard";
import { supervisorInformation, coordinatorInformation } from "../../../assets/data/dashboard-contact-information";

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
  const name = "test_name";
  const [policy, setPolicy] = useState("policy");

  useEffect(() => {
    const updateLoopCount = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight < 900) setLoopCount(1);
      else if (screenHeight < 1175) setLoopCount(2);
      else setLoopCount(3);
    };

    updateLoopCount();
    window.addEventListener("resize", updateLoopCount);

    return () => window.removeEventListener("resize", updateLoopCount);
  }, []);

  return (
    <div id="dashboard">
      <Greeting name={name} />
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

          <h2 className="dashboard-subtitle">Past Timesheets</h2>
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
          <HolidayParent/>
          <AnnouncementParent/>
          <ContactCard groups={[supervisorInformation, coordinatorInformation]}/>
          <PoliciesCard policy={policy} setPolicy={setPolicy} isEditable={true}/>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
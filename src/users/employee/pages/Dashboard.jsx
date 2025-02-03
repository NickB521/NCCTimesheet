import React, { useState, useEffect } from "react";
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


const Dashboard = () => {
  const [loopCount, setLoopCount] = useState(0);
  const name = "test_name";
  const policy = "policy";

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

  return (
    <div id="dashboard">
      <Greeting name={name} />
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
          <HolidayList holidays={holidayData}/>
          <AnnouncementList announcements={announcementData}/>
          <ContactCard groups={[supervisorInformation, coordinatorInformation]}/>
          <PoliciesCard policy={policy} isEditable={false}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
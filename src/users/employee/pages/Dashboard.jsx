import React, { useState, useEffect } from "react";
import Greeting from "/src/components/Greeting.jsx";
import HolidayList from "/src/components/HolidayList";
import AnnouncementList from "/src/components/AnnouncementList";
import TimesheetCard from "/src/components/TimesheetCard";
import EmailCard from "/src/components/EmailCard";
import { timesheets, resubmitted } from "../../../assets/data/employee-data";
import { holidays as holidayData } from "../../../assets/data/holiday-data";
import { announcements as announcementData } from "../../../assets/data/announcement-data";

const Dashboard = () => {
  const [loopCount, setLoopCount] = useState(0);
  const name = "test_name";
  const policy = "policy";
  const contacts = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
  ];

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
          <h1 style={{ fontSize: "36px", fontWeight: "600", padding: "15px 0px 10px" }}>Timesheets</h1>

          <h2 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>Recent Timesheets</h2>
          {timesheets.slice(0, loopCount).map((item, index) => (
            <TimesheetCard
              key={index}
              hours={item.hours} 
              date={item.date}     
            />
          ))}

          <h2 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>Past Timesheets</h2>
          {resubmitted.slice(0, loopCount).map((item, index) => (
            <TimesheetCard
              key={index}
              hours={item.hours}
              date={item.date}
            />
          ))}
          <button id="timesheet-button">View All Timesheets</button>
        </div>

        <div id="side-cards">
          <HolidayList holidays={holidayData} isEditable={false} />
          <AnnouncementList announcements={announcementData} isEditable={false} />
          <div className="side-card">
            <h1>Contact Information</h1>
            <div style={{ width: "80%" }}>
              {contacts.map((contact, index) => (
                <div key={index}>
                  <EmailCard name={contact.name} email={contact.email} />
                </div>
              ))}
            </div>
          </div>
          <div className="side-card">
            <h1>Worksite Policies</h1>
            <div id="worksite-policies">
              <textarea
                disabled
                value={policy}
                style={{ width: "100%", height: "90%", color: "black" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import { timesheets, resubmitted } from "../../../assets/data/employee-data";
import { holidays as holidayData } from "../../../assets/data/holiday-data";
import { announcements as announcementData } from "../../../assets/data/announcement-data";

import Greeting from "/src/components/Greeting.jsx";
import HolidayList from "/src/components/HolidayList";
import AnnouncementList from "/src/components/AnnouncementList";
import TimesheetCard from "/src/components/TimesheetCard";
import EmailCard from "/src/components/EmailCard";

const CoordinatorDashboard = () => {

  const [loopCount, setLoopCount] = useState(0);
  const name = "test_name";
  const [worksitePolicies, setWorksitePolicies] = useState("");
  const [editPolicies, setEditPolicies] = useState(true);
  const [submitText, setSubmitText] = useState("Edit");
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

          {/* timesheets need to be changed */}
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
          <HolidayList
            holidays={holidayData}
            isEditable={true}
            onAddHoliday={(newContent) => console.log("Add:", newContent)}
            onEditHoliday={(index, updatedContent) => console.log("Edit:", index, updatedContent)}
            onDeleteHoliday={(index) => console.log("Delete:", index)}
          />
          <AnnouncementList
            announcements={announcementData}
            isEditable={true}
            onAddAnnouncement={(newContent) => console.log("Add:", newContent)}
            onEditAnnouncement={(index, updatedContent) => console.log("Edit:", index, updatedContent)}
            onDeleteAnnouncement={(index) => console.log("Delete:", index)}
          />
          {/* work on contact information */}
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
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
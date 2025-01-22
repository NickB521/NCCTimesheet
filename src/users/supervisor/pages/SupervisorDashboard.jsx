import React, { useState, useEffect } from "react";
import { supervisorTimesheet, supervisorResubmitted } from "../../../assets/data/dashboard-timesheet-data";
import Greeting from "/src/components/Greeting.jsx";
import AnnouncementList from "/src/components/AnnouncementList";
import TimesheetCard from "/src/components/TimesheetCard";
import EmailCard from "/src/components/EmailCard";
import HolidayParent from "../../../components/HolidayParent";
import AnnouncementParent from "../../../components/AnnouncementParent";

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
          <h1 style={{ fontSize: "36px", fontWeight: "600", padding: "15px 0px 10px" }}>Timesheets</h1>

          <h2 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>Recent Timesheets</h2>
          {supervisorTimesheet.slice(0, loopCount).map((item, index) => (
            <TimesheetCard
              key={index}
              title={item.title}  
              hours={item.hours} 
            />
          ))}

          <h2 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>Past Timesheets</h2>
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
          {/* work on contact information */}
          <div className="side-card">
            <h1>Worksite Policies</h1>
            <div id="worksite-policies">
              <textarea
                disabled={editPolicies}
                onChange={(e) => setWorksitePolicies(e.target.value)}
                value={worksitePolicies}
                style={{ width: "100%", height: "90%", color: "black" }}
              />
            </div>
            <button
              id="textarea-button"
              onClick={() => {
                setEditPolicies(!editPolicies);
                setSubmitText(editPolicies ? "Submit" : "Edit");
              }}
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
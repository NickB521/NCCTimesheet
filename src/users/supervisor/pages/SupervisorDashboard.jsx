import React, { useState, useEffect } from "react";
import { Edit, Forward, Success, Denied, Seperator } from "/src/assets/icons/dashboard";
import { Tooltip } from "@nextui-org/react";
import { announcements } from "../../../assets/data/announcement-data";
import { timesheets } from "../../../assets/data/timesheets-data";
import { resubmitted } from "../../../assets/data/resubmittedtimesheets-data";

const Widget = ({ date, content }) => {
  const [maxChars, setMaxChars] = useState(25);

  useEffect(() => {
    const updateMaxChars = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 950) {
        setMaxChars(5);
      } 
      else if (screenWidth < 1100) {
        setMaxChars(10);
      } 
      else if (screenWidth < 1350) {
        setMaxChars(15);
      } 
      else if (screenWidth < 1600) {
        setMaxChars(20);
      } 
      else if (screenWidth < 1850) {
        setMaxChars(30);
      } 
      else if (screenWidth < 1970) {
        setMaxChars(40);
      } 
      else {
        setMaxChars(45);
      }
    };

    updateMaxChars();
    window.addEventListener("resize", updateMaxChars);

    return () => {
      window.removeEventListener("resize", updateMaxChars);
    };
  }, []);

  const isOverflowing = content.length > maxChars;

  return (
    <div id="card-row">
      <Seperator />
      <Tooltip
        isDisabled={!isOverflowing}
        showArrow
        placement="right"
        offset={25}
        closeDelay={0}
        content={
          <div className="px-1 py-2">
            <div
              className="text-small text-center"
              style={{ paddingBottom: "5px", fontWeight: "600" }}
            >
              {date}
            </div>
            <div
              className="text-tiny text-left break-words pt-5 rounded-md"
              style={{ width: "125px" }}
            >
              {content}
            </div>
          </div>
        }
      >
        <div className="flex-1 text-white" id="card-row-content">
          <p className="font-semibold">{date}</p>
          <p>
            {isOverflowing ? `${content.substring(0, maxChars)}...` : content}
          </p>
        </div>
      </Tooltip>
    </div>
  );
};

const TimesheetCard = ({ date, hours, icon, status }) => (
  <div id="card-row">
    <Seperator />
    <div className="flex-1 text-white" id="card-row-content" style={{ display: "flex" }}>
      <div className="flex-1 text-white">
        <p className="font-semibold">{date}</p>
        <p>{hours} Hours</p>
      </div>
      <button
        className="text-white"
        style={{ display: "flex", justifyContent: "Right", alignItems: "center", transform: "rotate(90deg)" }}
      >
        <Forward />
      </button>
    </div>
    <div className="flex space-x-2">
      <button className={`text-${status}`} style={{ marginLeft: "10px" }}>
        {icon}
      </button>
    </div>
  </div>
);

const EmailCard = ({ name, email }) => {
  let [maxChars, setMaxChars] = useState(100);
  let screenWidth;

  useEffect(() => {
    const updateMaxChars = () => {
      screenWidth = window.innerWidth;
      if (screenWidth < 950) {
        setMaxChars(5);
      } 
      else if (screenWidth < 1100) {
        setMaxChars(10);
      } 
      else if (screenWidth < 1350) {
        setMaxChars(15);
      } 
      else if (screenWidth < 1600) {
        setMaxChars(20);
      } 
      else if (screenWidth < 1750) {
        setMaxChars(30);
      } 
      else if (screenWidth < 1950) {
        setMaxChars(40);
      } 
      else {
        setMaxChars(50);
      }
    }

    updateMaxChars();

    window.addEventListener("resize", updateMaxChars);
    return () => {
      window.removeEventListener("resize", updateMaxChars);
    };
  }, []);
  
  return(
    <>
      <p>{name}</p>
      <a href={`mailto:${email}`} className="break-words">{email.length > maxChars ? `${email.substring(0, maxChars)}...` : email}</a>
    </>
  )
}

const SupervisorDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [editPolicies, setEditPolicies] = useState(true);
  const [submitText, setSubmitText] = useState("Edit");
  const [worksitePolicies, setWorksitePolicies] = useState("");

  const addAnnouncementRow = () => {
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Afternoon");
    } else if (currentHour >= 18 && currentHour < 22) {
        setGreeting("Evening");
    } else {
        setGreeting("Night");
    }
  }, []);

  return (
    <div id="dashboard" >
      <div id="dashboard-header" className="bg-red-100">
        <div id="dashboard-header-content">
          <p className="text-5xl" style={{fontSize:"48px"}}>Good {greeting} Supervisor!</p>
          <p className="text-2xl" style={{fontSize:"32px"}}>name</p>
        </div>
      </div>
      <div id="dashboard-body">
        <div id="main-card">
          <h1 style={{fontSize: "36px", fontWeight: "600", padding: "15px 0px 10px"}}>Timesheets</h1>
          <h1 style={{fontSize: "24px", fontWeight: "600", padding: "10px 0px"}}>Submitted Timesheets</h1>

          {timesheets.map((item, index) => (
                  <Widget key={index} date={item.date} content={item.content} />
              ))}
              

          <h1 style={{fontSize: "24px", fontWeight: "600", padding: "10px 0px"}}>Resubmitted Timesheets</h1>

          {resubmitted.map((item, index) => (
                  <Widget key={index} date={item.date} content={item.content} />
              ))}

          <button id="timesheet-button">View All Timesheets</button>
        </div>
        <div id="side-cards">
          <div className="side-card">
            <h1>Upcoming Holidays</h1>
            <Widget date="12/24-25/2024" content="Christmas" />
            <Widget date="01/01/2025" content="New Year's Day" />
            <Widget date="01/20/2025" content="Martin Luther King, Jr. Day" />
            <Widget date="05/26/2025" content="Memorial Day" />
          </div>
          <div className="side-card break-words">
            <h1>Worksite Policies</h1>
            <div id="worksite-policies">
              <h2 style={{fontSize: "18px", fontWeight: "600", textAlign:"center"}}>Code Differently</h2>
              <div style={{paddingTop: "20px", height: "80%"}}>
                <textarea 
                  disabled={editPolicies}
                  placeholder="Enter your policies..."
                  onChange={(inp) => setWorksitePolicies(inp)}
                >
                  {worksitePolicies}
                </textarea>
                <button id="textarea-button" onClick={() => {setEditPolicies(!editPolicies), setSubmitText(editPolicies ? "Submit" : "Edit")}}>{submitText}</button>
              </div>
            </div>
          </div>
          <div className="side-card break-words" style={{textAlign: "center", gap:"20px"}}>
            <h1>Contact Information</h1>
            <div style={{width: "80%"}}>
              <h2 style={{fontSize: "18px", fontWeight: "600"}}>Worksite Supervisor(s)</h2>
              <div style={{paddingTop: "20px"}}>
                <EmailCard name="Jeff Lawrence" email="jeff@codedifferently.com"/>
              </div>
              <div>
                <EmailCard name="Nick Blackson" email="nicolas@codedifferently.com"/>
              </div>
              <br />
              <h2 style={{fontSize: "18px", fontWeight: "600", paddingTop: "20px", borderTop: "#ECC644 2px solid"}}>County Coordinators(s)</h2>
              <div style={{paddingTop: "20px"}}>
                <EmailCard name="Zanora Berry-El" email="Zanora.Berry-El@newcastlede.gov"/>
              </div>
              <div>
                <EmailCard name="Raymond Gravuer" email="Raymond.Gravuer@newcastlede.gov"/>
              </div>
            </div>
          </div>
          <div className="side-card">
            <h1>Announcements</h1>
            <div id="announcement-content">
              {announcements.map((item, index) => (
                  <Widget key={index} date={item.date} content={item.content} />
              ))}
              <Widget date="06/02/2024" content="NCCVT - Mandatory PD Training, Zoom Link In Email" />
              <Widget date="08/21/2024" content="Supervisor 1 - PD Days Wed/Thur" />
              <Widget date="09/18/2024" content="Day Off Tomorrow" />
              <Widget date="10/15/2024" content="Shift Availible For Pickup" />
              <Widget date="09/18/2024" content="Day Off Tomorrow" />
              <Widget date="10/15/2024" content="Shift Availible For Pickup" />
            </div>
            <button id="announcement-button" onClick={() => addAnnouncementRow()}>Make Announcement</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupervisorDashboard;


import React, { useState, useEffect } from "react";
import { Forward, Seperator } from "/src/assets/icons/dashboard";
import { employee, pastemployee } from "../../../assets/data/employee-data";
import { Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import {announcements} from "../../../assets/data/announcement-data";
import {holidays} from "../../../assets/data/holiday-data";

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

const setActiveNotification = (item) => {

  const notificationItems = {
      day: item.day,
      month: item.month,
      year: item.year,
  }

  sessionStorage.setItem('activeNotification', JSON.stringify(notificationItems));
  console.log(sessionStorage.getItem('activeNotification'));
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
      <Link 
        to="/calendar" 
        onClick={() => {
            setActiveNotification(item);
            window.location.reload();
        }}
      >
        <button className={`text-${status}`} style={{ marginLeft: "10px" }}>
          {icon}
        </button>
      </Link>
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

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [loopCount, setLoopCount] = useState(0);
  const [worksitePolicies, setWorksitePolicies] = useState("text");

  const updateLoopCount = () => {
    const screenHeight = window.innerHeight;

    if (screenHeight < 900) {
      setLoopCount(1);
    } else if (screenHeight < 1175) {
      setLoopCount(2);
    } else {
      setLoopCount(3);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Evening";
    } else {
      return "Night";
    }
  };

  useEffect(() => {
    setGreeting(getGreeting());
    updateLoopCount();

    window.addEventListener("resize", updateLoopCount);
    return () => window.removeEventListener("resize", updateLoopCount);
  }, []);

  return (
    <div id="dashboard" >
      <div id="dashboard-header" className="bg-red-100">
        <div id="dashboard-header-content">
          <p className="text-5xl" style={{fontSize:"48px"}}>Good {greeting}!</p>
          <p className="text-2xl" style={{fontSize:"32px"}}>name</p>
        </div>
      </div>
      <div id="dashboard-body">
        <div id="main-card">
          <h1 style={{fontSize: "36px", fontWeight: "600", padding: "15px 0px 10px"}}>Timesheets</h1>
          <h1 style={{fontSize: "24px", fontWeight: "600", padding: "10px 0px"}}>Recent Timesheets</h1>
        
          {employee.slice(0, loopCount).map((item, index) => (
            <TimesheetCard key={index} date={item.date} hours={item.hours} item={item}/>
          ))}

          <h1 style={{fontSize: "24px", fontWeight: "600", padding: "10px 0px"}}>Past Timesheets</h1>
         
          {pastemployee.slice(0, loopCount).map((item, index) => (
            <TimesheetCard key={index} date={item.date} hours={item.hours} item={item}/>
          ))}

          

          <button id="timesheet-button">View All Timesheets</button>
        </div>
        <div id="side-cards">
        <div className="side-card">
            <h1>Upcoming Holidays</h1>
            <div className="dashboard-edit-content" style={{cursor:"pointer"}} >
              {holidays.map((item, index) => (
                <div key={index}>
                  <Widget date={item.date} content={item.content}/>
                </div>
              ))}
            </div>
          </div>
          <div className="side-card">
            <div id="worksite-policies">
              <h2 style={{ fontSize: "18px", fontWeight: "600", textAlign: "center", marginTop: "15px" }}>Code Differently</h2>
              <div style={{ paddingTop: "20px", height: "80%" }}>
                <textarea
                  disabled
                  placeholder="Enter your policies..."
                  value={worksitePolicies}
                  style={{ width: "100%", height: "90%" }}
                />
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
            <div className="dashboard-edit-content" style={{cursor:"pointer"}} >
              {announcements.map((item, index) => (
                <div key={index}>
                  <Widget date={item.date} content={item.content}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


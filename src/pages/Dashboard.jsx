import React, { useState, useEffect } from "react";
import { Edit, Forward, Success, Denied, Seperator } from "../assets/icons/dashboard";


const Widget = ({ date, content }) => (
  <div id="card-row">
    <Seperator/>
    <div className="flex-1 text-white" id="card-row-content">
      <p className="font-semibold">{date}</p>
      <p>{content}</p>
    </div>
  </div>
);

const TimesheetCard = ({ date, hours, icon, status }) => (
  <div id="card-row">
    <Seperator/>
    <div className="flex-1 text-white" id="card-row-content" style={{display:"flex"}}>
      <div className="flex-1 text-white">
        <p className="font-semibold">{date}</p>
        <p>{hours} Hours</p>
      </div>
      <button className="text-white" style={{display:"flex", justifyContent:"Right", alignItems:"center", transform:"rotate(90deg)"}}>
        <Forward/>
      </button>
    </div>
    <div className="flex space-x-2">
      <button className={`text-${status}`} style={{marginLeft: "10px"}}>
        {icon}
      </button>
    </div>
  </div>
);

const Dashboard = () => {
    const [greeting, setGreeting] = useState('');

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
        <div id="dashboard">
            <div id="dashboard-header" className="bg-red-100">
                <div id="dashboard-header-content">
                    <p className="text-5xl" style={{fontSize:"48px"}}>Good {greeting}!</p>
                    <p className="text-2xl" style={{fontSize:"32px"}}>name</p>
                </div>
            </div>
            <div id="dashboard-body" style={{overflowY: "auto"}}>
              <div id="main-card">
                <h1 style={{fontSize: "36px", fontWeight: "600", padding: "15px 0px 10px"}}>Timesheets</h1>
                <h1 style={{fontSize: "24px", fontWeight: "600", padding: "15px 0px 10px"}}>Recent Timesheets</h1>
                <TimesheetCard
                  date="2023-11-19"
                  hours="40"
                  status="default"
                  icon={<Edit/>}
                />
                <h1 style={{fontSize: "24px", fontWeight: "600", padding: "15px 0px 10px"}}>Past Timesheets</h1>
                <TimesheetCard
                  date="2023-11-12"
                  hours="40"
                  status="danger"
                  icon={<Denied/>}
                />
                <TimesheetCard
                  date="2023-11-05"
                  hours="35"
                  status="success"
                  icon={<Success/>}
                />
                <TimesheetCard
                  date="2023-11-05"
                  hours="35"
                  status="success"
                  icon={<Success/>}
                />
                <TimesheetCard
                  date="2023-11-05"
                  hours="35"
                  status="success"
                  icon={<Success/>}
                />
                <TimesheetCard
                  date="2023-11-05"
                  hours="35"
                  status="success"
                  icon={<Success/>}
                />
                <TimesheetCard
                  date="2023-11-05"
                  hours="35"
                  status="success"
                  icon={<Success/>}
                />
                <button id="timesheet-button">View All Timesheets</button>
              </div>
              <div id="side-cards">
                <div className="side-card">
                  <h1 style={{fontSize: "24px", fontWeight: "600", padding: "15px 0px 10px"}}>Upcoming Holidays</h1>
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                </div>
                <div className="side-card">
                  <h1 style={{fontSize: "24px", fontWeight: "600", padding: "15px 0px 10px"}}>Upcoming Holidays</h1>
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                </div>
                <div className="side-card">
                  <h1 style={{fontSize: "24px", fontWeight: "600", padding: "15px 0px 10px"}}>Upcoming Holidays</h1>
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                </div>
                <div className="side-card">
                  <h1 style={{fontSize: "24px", fontWeight: "600", padding: "15px 0px 10px"}}>Upcoming Holidays</h1>
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                  <Widget date="01/01/2024" content="New Year's Day" />
                </div>
              </div>
            </div>
        </div>
    );
}

export default Dashboard;
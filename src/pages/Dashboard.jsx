import React, { useState, useEffect } from "react";
import { Edit, Forward, Seperator } from "../assets/icons/dashboard";

const Widget = ({ date, content }) => (
  <div id="card-row">
    <Seperator></Seperator>
    <div className="flex-1 text-white" id="card-row-content" style={{}}>
      <p className="font-semibold">{date}</p>
      <p>{content}</p>
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

    const SideCards = () => {
        // fill out with side cards once I have the structure finished
    }

    const CardRow = ({ icon1, icon2 }) => {
        return (
            <div id="card-row">
                {/* I'll make the size correct later */}
                <div id="main-card-content"></div>
                {icon1}
                {icon2}
            </div>
        );
    };

    return (
        <div id="dashboard">
            <div id="dashboard-header" className="bg-red-100">
                <div id="dashboard-header-content">
                    <p className="text-5xl" style={{fontSize:"48px"}}>Good {greeting}</p>
                    <p className="text-2xl" style={{fontSize:"32px"}}>name</p>
                </div>
            </div>
            <div id="dashboard-body">
                <div id="main-card">
                    {/* <CardRow icon1={<Edit/>} icon2={<Forward/>}/> */}
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
                    </div><div className="side-card">
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
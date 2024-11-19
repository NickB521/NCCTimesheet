import React, { useState, useEffect } from "react";
import { Seperator, Edit, Forward } from "../assets/icons/dashboard";

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

    const CardRow = ({ icon1, icon2, content, message}) => {
        return (
            <div id="card-row">
                {/* I'll make the size correct later */}
                <Seperator />
                <div id="main-card-content"> {content} {message}</div>
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
                    <p className="text-2xl" style={{fontSize:"32px"}}>Firstname</p>
                </div>
            </div>
            <div id="dashboard-body">
                <div id="main-card">

                    Timesheets
                    <CardRow icon1={<Edit/>} icon2={<Forward/>} content ="{currentdate}" message="{currentperiod}"/>
                    <CardRow icon1={<Edit/>} icon2={<Forward/>} content ="{currentdate}" message="{currentperiod}"/>
                    <CardRow icon1={<Edit/>} icon2={<Forward/>} content ="{currentdate}" message="{currentperiod}"/>
                    <CardRow icon1={<Edit/>} icon2={<Forward/>} content ="{currentdate}" message="{currentperiod}"/>

                </div>
                <div id="side-cards">
                    <div className="side-card ">

                 Announcements
                  <CardRow content ="{Announcement #1}" message="{Message}"/>
                  <CardRow content ="{Announcement #2}" message="{Message}"/>
                  <CardRow content ="{Announcement #3}" message="{Message}"/>
                  <CardRow content ="{Announcement #4}" message="{Message}"/>

                    </div>
                    <div className="side-card">
                        Upcoming Holidays
                        <CardRow/>
                  <CardRow/>
                  <CardRow/>
                  <CardRow/>



                  

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
import React, { useState, useEffect } from "react";

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

                </div>
                <div id="side-cards">
                    <div className="side-card">

                    </div>
                    <div className="side-card">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
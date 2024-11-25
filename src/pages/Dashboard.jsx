import React, { useState, useEffect } from "react";
import { Seperator, Edit, Forward } from "../assets/icons/dashboard";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

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
    <div id="dashboard" className="p-6 bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <p className="text-4xl font-bold text-gray-700">
          Good {greeting}, {name || "Name"}
        </p>
      </div>

      {/* Dashboard Body */}
      <div className="flex flex-row gap-6 flex-1">
        {/* Timesheet Section */}
        <div className="flex flex-col" style={{ width: "50%" }}>
          {/* Timesheets Container */}
          <div className="bg-white p-4 shadow rounded-lg flex-1">
            <h2 className="text-lg font-semibold mb-4">Timesheets</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <TimesheetCard
                date="2023-11-19"
                hours="40"
                status="Current"
                icons={[<Forward />]}
              />
            </div>
            {/* Previous Timesheets */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Previous Timesheets</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <TimesheetCard
                  date="2023-11-12"
                  hours="40"
                  status="Approved"
                  icons={[<Edit />]}
                />
                <TimesheetCard
                  date="2023-11-05"
                  hours="35"
                  status="Approved"
                  icons={[<Edit />]}
                />
                <TimesheetCard
                  date="2023-10-29"
                  hours="30"
                  status="Rejected"
                  icons={[<Edit />]}
                />
              </div>
            </div>
            {/* View All Timesheets Button */}
            <button
              style={{
                marginTop: "22px",
                backgroundColor: "#1E40AF",
                color: "white",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                display: "block",   
                margin: "0 auto",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1E40AF")}
            >
              View All Timesheets
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col" style={{ width: "50%" }}>
          {/* Announcements Section */}
          <div className="bg-white p-4 shadow rounded-lg flex-1">
            <h2 className="text-lg font-semibold mb-4">Announcements</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Card message="(Message)" date="11/20/2023" />
              <Card message="(Message)" date="11/18/2023" />
              <Card message="(Message)" date="11/15/2023" />
            </div>
          </div>

          {/* Upcoming Holidays Section */}
          <div className="bg-white p-4 shadow rounded-lg flex-1">
            <h2 className="text-lg font-semibold mb-4">Upcoming Holidays</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Card date="11/23/2023" name="Thanksgiving" />
              <Card date="12/25/2023" name="Christmas" />
              <Card date="01/01/2024" name="New Year's Day" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimesheetCard = ({ date, hours, status, icons }) => (
  <div className="flex items-center p-4 shadow relative" style={{ backgroundColor: "#084c83", borderRadius: "10px" }}>
    <Seperator style={{ marginRight: "16px", backgroundColor: "#FFC107" }} />
    <div className="flex-1 text-white">
      <p className="font-semibold">{date}</p>
      <p>{hours} Hours - {status}</p>
    </div>
    <div className="flex space-x-2">
      {icons.map((icon, index) => (
        <button key={index} className="text-white">
          {icon}
        </button>
      ))}
    </div>
  </div>
);

const Card = ({ date, message, name }) => (
  <div className="flex items-center p-4 shadow" style={{ backgroundColor: "#084c83", borderRadius: "10px" }}>
    <Seperator style={{ marginRight: "16px", backgroundColor: "#FFC107" }} />
    <div className="flex-1 text-white">
      <p className="font-semibold">{date}</p>
      <p>{message || name}</p>
    </div>
  </div>
);

export default Dashboard;

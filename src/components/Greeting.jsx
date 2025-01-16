import React, { useEffect, useState } from "react";

const Greeting = ({ name }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    let greetingMessage = "";

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = "Afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
      greetingMessage = "Evening";
    } else {
      greetingMessage = "Night";
    }

    setGreeting(greetingMessage);
  }, []);

  return (
    <div id="dashboard-header" className="bg-red-100">
      <div id="dashboard-header-content">
        <p className="text-5xl" style={{ fontSize: "48px" }}>
          Good {greeting}, {name}!
        </p>
      </div>
    </div>
  );
};

export default Greeting;
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
      <p style={{ fontSize: "3em", fontWeight: "600", textAlign:"left"}}>
        Good {greeting}, {name}!
      </p>
    </div>
  );
};

export default Greeting;
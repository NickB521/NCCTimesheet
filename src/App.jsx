import "./styles/Dashboard.css"
import './styles/App.css'
import './styles/index.css'
import './styles/Calendar.css'
import './styles/SignIn.css'
import Navigation from './components/Navigation';
import Header from './components/Header';
import Dashboard from "./users/employee/pages/Dashboard.jsx";
import Calendar from "./users/employee/pages/Calendar.jsx";
import SupervisorDashboard from "./users/supervisor/pages/SupervisorDashboard.jsx";
import SupervisorCalendar from "./users/supervisor/pages/SupervisorCalendar.jsx";

import CoordinatorDashboard from "./users/coordinator/pages/CoordinatorDashboard.jsx"
import CoordinatorCalendar from "./users/coordinator/pages/CoordinatorCalendar.jsx"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SupervisorTable from "./users/supervisor/pages/SupervisorTable.jsx"
import HolidayAlert from "./components/HolidayAlert.jsx"

import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Context from "./components/Context.jsx";
import { useNavigate } from "react-router-dom";

const getCalendar = (role) => {
  switch (role) {
    case "EMPLOYEE":
      return <Calendar />;
    case "SUPERVISOR":
      return <SupervisorTable />;
    case "COORDINATOR":
      return <CoordinatorCalendar />;
    default:
      return <></>;
  }
}

const getDashboard = (role) => {
  switch (role) {
    case "EMPLOYEE":
      return <Dashboard />;
    case "SUPERVISOR":
      return <SupervisorDashboard />;
    case "COORDINATOR":
      return <CoordinatorDashboard />;
    default:
      return <></>;
  }
}


const App = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState(
    {
      holiday: false,
      name: "person",
      role: {
        id: null,
        name: "COORDINATOR"
      },
      email: "email@email.com",
      worksite: {
        name: "place"
      }
    }
  );

  const [dayOff, setDayOff] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("token") && !token){
      setToken(localStorage.getItem("token"))
    }
    if (token) { // 2 hour life-span
      // MAKE THE CHECK FOR USER CONTENT OR A TOKEN ERROR SINCE BACKEND HAS A LIFE SPAN PRE-SET????????????
      navigate("/")
    } else {
      navigate("/sign-in")
    }
  }, [token])
  

  return (
    <>
      <Context.Provider value={{ token, setToken, user, setUser }}>
        <Header />
        <div id="content-wrapper-wrapper">
          <Navigation
            role={user.role}
          />
          <HolidayAlert
            isOpen={dayOff}
            onClose={() => {
              setDayOff(false);
            }}
          />
          <Routes>
            <Route path="/" element={getDashboard(user.role.name)} />
            <Route path="calendar" element={getCalendar(user.role.name)} />
            <Route path="employee-focus" element={<SupervisorCalendar />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
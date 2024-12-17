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

import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

const getCalendar = (role) => {
  console.log(role);
  switch (role){
    case "Employee":
      return <Calendar/>;
    case "Supervisor":
      return <SupervisorCalendar/>;
    case "Coordinator":
      return <CoordinatorCalendar/>;
  }
}

const getDashboard = (role) => {
  switch (role){
    case "Employee":
      return <Dashboard/>;
    case "Supervisor":
      return <SupervisorDashboard/>;
    case "Coordinator":
      return <CoordinatorDashboard/>;
  }
}

const App = () => {

  const [user, setUser] = useState({
    name: "USER IS ME",
    role: "Employee",
    email: "email@email.com",
    worksite: {
      name: ""
    }
  });

  return (
    <>
      <Header />
      <div id="content-wrapper-wrapper">
        <Navigation />
        <Routes>
          <Route path="/" element={getDashboard(user.role)} />
          <Route path="calendar" element={getCalendar(user.role)}/>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
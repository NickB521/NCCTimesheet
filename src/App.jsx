import "./styles/Dashboard.css"
import './styles/App.css'
import './styles/index.css'
import './styles/Calendar.css'
import './styles/SignIn.css'
import Navigation from './components/Navigation';
import Header from './components/Header';
import Dashboard from "./users/employee/pages/Dashboard.jsx";
import Calendar from "./users/employee/pages/Calendar.jsx";
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
  console.log(role);
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
    },
    temp: true
  });
  return (
    <>
      <Header />
      <div id="content-wrapper-wrapper">
        <Navigation />
        {/* <button onClick={setUser(user => ({...user, temp: !(user.temp)}))}></button> */}
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
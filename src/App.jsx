import "./styles/Dashboard.css"
import './styles/App.css'
import './styles/index.css'
import './styles/Calendar.css'
import './styles/SignIn.css'
import Navigation from './components/Navigation';
import Header from './components/Header';
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

const App = () => {
  const [user, setUser] = useState({
    name: "USER IS ME",
    role: "Supervisor",
    email: "email@email.com",
    worksite: {
      name: ""
    },
    temp: false
  });
  return (
    <>
      <Header />
      <div id="content-wrapper-wrapper">
        <Navigation />
        {/* <button onClick={setUser(user => ({...user, temp: !(user.temp)}))}></button> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="calendar" element={
            user.temp ? <Calendar /> : <>Super Man</>
          } />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
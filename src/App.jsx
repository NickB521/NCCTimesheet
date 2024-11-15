import "./styles/App.css"
import "./styles/index.css"
import "./styles/Dashboard.css"

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header/>
      <div id="content-wrapper">
        <Navigation/>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="calendar" element={ <Calendar /> } />
        </Routes>
      </div>
    </>
  );
}

export default App;
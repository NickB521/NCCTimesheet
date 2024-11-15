import "./styles/App.css"
import "./styles/index.css"
import "./styles/Dashboard.css"

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <>
      <Header/>
      <div id="content-wrapper">
        <Navigation/>
        <Dashboard/>
      </div>
    </>
  );
}

export default App;
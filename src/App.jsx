import "./styles/App.css"
import "./styles/index.css"

import Navigation from "./components/Navigation";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header/>

      <div id="content-wrapper">
        <Navigation/>
      </div>
    </>
  );
}

export default App;
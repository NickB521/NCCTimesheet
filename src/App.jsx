import './styles/App.css'
import './styles/index.css'
import './styles/WeeklyView.css'
import Navigation from './components/Navigation';
import Header from './components/Header';
import WeeklyView from './components/WeeklyView';

function App () {
  return (
    <>
      <Header/>
      <div id="content-wrapper">
        <Navigation/>
        <WeeklyView/>
      </div>
    </>
  );
}

export default App;
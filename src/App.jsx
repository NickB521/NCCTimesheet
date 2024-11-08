import './styles/App.css'
import Navigation from './components/Navigation';
import Header from './components/Header';

function App () {
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
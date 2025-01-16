import './App.css'
import Home from "./pages/Home.jsx";
import ResponsiveAppBar from "./components/AppBar.jsx";
import './css/AppBar.css';

function App() {

  return (
      <>
          <ResponsiveAppBar className="app-bar"/>
          <main className="main-content">
              <Home/>
          </main>
      </>
  )
}

export default App;

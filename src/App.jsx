import './App.css'
import Home from "./pages/Home.jsx";
import ResponsiveAppBar from "./components/NavBar.jsx";
import './css/AppBar.css';
import Production from "./pages/Production.jsx";
import Sales from "./pages/Sales.jsx";
import Expense from "./pages/Expense.jsx";
import Income from "./pages/Income.jsx";
import {BrowserRouter, Route, Routes} from "react-router";

function App() {

  return (
      <BrowserRouter>
      <>
          <ResponsiveAppBar className="app-bar"/>
          <main className="main-content">

                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/production" element={<Production />} />
                      <Route path="/expense" element={<Expense />} />
                      <Route path="/sales" element={<Sales />} />
                      <Route path="/income" element={<Income />} />
                  </Routes>

          </main>
      </>
      </BrowserRouter>
  )
}

export default App;

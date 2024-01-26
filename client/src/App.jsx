import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Houses from "./pages/houses";
import About from "./pages/about.jsx";
import House1 from "./pages/house1.jsx";
import House2 from "./pages/house2.jsx";
import House3 from "./pages/house3.jsx";
import House4 from "./pages/house4.jsx";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/about" element={<About />} />
            <Route path="/house1" element={<House1 />} />
            <Route path="/house2" element={<House2 />} />
            <Route path="/house3" element={<House3 />} />
            <Route path="/house4" element={<House4 />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Houses from "./pages/houses";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/houses" element={<Houses />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

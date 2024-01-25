import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Login successful:", response.data);
        //navigate(`/room/${username}`);
      } else {
        console.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white text-2xl text-center">
      <div className="flex flex-col gap-5">
        <div className="font-bold text-5xl">Login</div>
        <div className="flex flex-col gap-2 rounded">
          <input
            className="px-5 outline-none rounded text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter Username"
          />
          <input
            className="px-5 outline-none rounded text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter Password"
          />
          <div className="rounded bg-opacity-50 bg-white py-1 hover:bg-blue-400 hover:shadow hover:shadow-black hover:shadow-md">
            <button onClick={handleLogin} className="login-btn">
              Log In
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-40">
        <p>Don't have an account? </p>
        <Link to="/Signup">
          <button className="hover:border-b-2 border-b-blue-600 hover:font-bold">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;

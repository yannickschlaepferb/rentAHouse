import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function houses() {
  //const navigate = useNavigate();

  return (
    <div className="houses-page">
      <h1 className="text-5xl font-bold mb-8">
        Choose the House You Want to Rent
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-3 w-screen h-screen">
        <img src="./images/house1.png" />
        <img src="./images/house2.png" />
        <img src="./images/house3.png" />
        <img src="./images/house4.png" />
      </div>
    </div>
  );
}

export default houses;

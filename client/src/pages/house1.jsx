import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Script from "./script.jsx";


function houses() {
  //const navigate = useNavigate();

  return (
    <div className="houses-page">
      <h1 className="text-5xl font-bold mb-8">
        Cottage
      </h1>
      <div className="grid grid-cols-2 gap-3">
        <img className="w-full h-128 md:h-192 object-cover col-span-2" src="./images/house1.png" />
        <img className="w-full h-64 md:h-96 object-cover" src="./images/house1_pic1.png" />
        <img className="w-full h-64 md:h-96 object-cover" src="./images/house1_pic2.png" />
        <img className="w-full h-64 md:h-96 object-cover" src="./images/house1_pic3.png" />
      </div>
        <Script />
    </div>
  );
}

export default houses;

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
      <div className="grid grid-cols-2 grid-rows-2 gap-3 w-screen h-full">
        <Link to="/house1">
          <h2 className="text-2xl font-bold mb-4">Cottage</h2>
          <img
            className="max-w-full w-96 h-72 block mx-auto mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover sm:w-auto sm:h-auto"
            src="./images/house1.png"
          />
        </Link>
        <Link to="/house2">
          <h2 className="text-2xl font-bold mb-4">Bonfire Cottage</h2>
          <img
            className="max-w-full w-96 h-36 block mx-auto mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover sm:w-auto sm:h-auto"
            src="./images/house2.png"
          />
        </Link>
        <Link to="/house3">
          <h2 className="text-2xl font-bold mb-4">Dome House</h2>
          <img
            className="max-w-full w-96 h-72 block mx-auto mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover sm:w-auto sm:h-auto"
            src="./images/house3.png"
          />
        </Link>
        <Link to="/house4">
          <h2 className="text-2xl font-bold mb-4">House at Bodensee</h2>
          <img
            className="max-w-full w-96 h-72 block mx-auto mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover sm:w-auto sm:h-auto"
            src="./images/house4.png"
          />
        </Link>
      </div>
    </div>
  );
}

export default houses;

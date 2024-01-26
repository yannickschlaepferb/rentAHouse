import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import backgroundImg from "./images/aboutUsPic.jpg";


function about() {
  //const navigate = useNavigate();

  return (
    //className="container mx-auto my-8 px-4" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', color: 'white' }}
    <div>
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-5xl font-bold mb-8">
        About Us at <span className="text-teal-500">StayVista</span>
      </h1>

      <p className="text-xl mb-4">
        Welcome to <span className="text-teal-500">StayVista</span>, where every journey is an unforgettable
        experience. Our mission is to redefine travel by providing you with the
        most extraordinary accommodations and creating memories that last a
        lifetime.
      </p>

      <p className="text-xl mb-4">
        At <span className="text-teal-500">StayVista</span>, we believe that your accommodation sets the tone for your
        entire trip. That's why we've handpicked a diverse range of properties,
        from charming cottages nestled in serene landscapes to modern urban
        retreats in bustling city centers.
      </p>

      <p className="text-xl mb-4">
        Our dedicated team is passionate about making your travel dreams a
        reality. We go the extra mile to ensure that each property meets our
        high standards of comfort, cleanliness, and uniqueness. Whether you're a
        solo traveler seeking adventure or a family looking for a relaxing
        getaway, we have the perfect home for you.
      </p>

      <p className="text-xl mb-4">
        <span className="text-teal-500">StayVista</span> is more than just a platform for booking accommodations; it's
        a community of like-minded travelers who share a love for exploration
        and discovery. Join us in creating a world where every journey is a
        story waiting to be told.
      </p>

      <p className="text-xl mb-4">
        Thank you for choosing <span className="text-teal-500">StayVista</span>. We're excited to be part of your
        travel story, and we look forward to helping you create memories that
        will last a lifetime.
      </p>
    </div>
    </div>
  );
}

export default about;

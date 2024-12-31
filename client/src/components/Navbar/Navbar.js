import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Assuming you are using the same CSS file for Navbar

const Navbar = ({ toggleModal }) => {
  const navigate = useNavigate();

  return (
    <div className="bottomNavbar">
      <button className="navbarButton" onClick={toggleModal}>
        Add Product
      </button>
      <button
        className="navbarButton"
        onClick={() => navigate("/DatabaseView")}
      >
        View Database
      </button>
      <button className="navbarButton">
        <Link to="/LoginForm" className="signoutLink">
          Sign Out
        </Link>
      </button>
    </div>
  );
};

export default Navbar;

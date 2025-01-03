import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Assuming you are using the same CSS file for Navbar

const Navbar = ({ toggleModal }) => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigate("/LoginForm");
      } else {
        console.log("Logout failed: ", response.statusText);
      }
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <div className="bottomNavbar">
      <button className="navbarButton" onClick={toggleModal}>
        Add Product
      </button>
      <button className="navbarButton" onClick={() => navigate("/History")}>
        View Database
      </button>
      <button className="navbarButton" onClick={handleLogout}>
        {/* <Link className="signoutLink">Sign Out</Link> */}
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;

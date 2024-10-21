import React, { useState, useEffect } from "react";
import logo from "./../../assets/fried-egg.png";
function Welcome() {
  useEffect(() => {
    // Apply global styles to prevent scroll and remove margin/padding
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.overflow = "hidden"; // Prevents scrolling
    return () => {
      // Clean up to restore the body styles when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);
  const welcomeStyle = {
    backgroundColor: "#F0B289", // Background color
    height: "100vh", // Full viewport height
    width: "100vw", // Full viewport width
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const logoStyle = {
    width: "130px",
    height: "auto",
  };
  const circleStyle = {
    width: "200px", // Diameter of the circle
    height: "200px", // Diameter of the circle
    backgroundColor: "white", // Circle background color
    borderRadius: "50%", // Make it circular
    display: "flex", // Use flexbox to center the logo inside the circle
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid #AC8266",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Optional shadow for depth
  };
  return (
    <div style={welcomeStyle}>
      <div style={circleStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
      </div>
    </div>
  );
}

export default Welcome;

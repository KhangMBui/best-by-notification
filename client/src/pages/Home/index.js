import React, { useState, useEffect } from "react";
import logo from "./../../assets/fried-egg.png";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo";

function Home() {
  return (
    <div style={styles.homeStyle}>
      <h1 style={styles.titleStyle}>BEST BY NOTIFICATION</h1>
      <Logo />
    </div>
  );
}

const styles = Stylesheet.create({
  titleStyle: {
    fontFamily: "GothicA1-Regular",
    borderBottom: "3px solid black", // Adds a black underline
    // paddingBottom: "1px", // Adds some space between the text and the underline
    marginBottom: "9vh",
  },
  homeStyle: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    marginTop: "4vh",
    fontSize: "4vw",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default Home;

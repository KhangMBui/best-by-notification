import React from "react";
import logo from "./../assets/images/fried-egg.png";
import Stylesheet from "reactjs-stylesheet";

function Logo() {
  return <img src={logo} alt="Logo" style={styles.logoStyle} />;
}

const styles = Stylesheet.create({
  logoStyle: {
    width: "17.61vh",
    height: "auto",
  },
});

export default Logo;

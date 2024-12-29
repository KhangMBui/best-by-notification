import React from "react";
import Webcam from "react-webcam";
import Stylesheet from "reactjs-stylesheet";
import Tesseract from "tesseract.js";
import "./../../assets/fonts/fonts.css";

function Home() {
  return (
    <div style={styles.homeStyle}>
      <h1 style={styles.titleStyle}>BEST BY NOTIFICATION</h1>
      <WebcamCapture />
    </div>
  );
}
const videoConstraints = {
  // width: 1080,
  // height: 1920,
  facingMode: "environment",
};
const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={styles.webcam}
      />
    </>
  );
};

const styles = Stylesheet.create({
  webcam: {
    width: "100vw", // Full width of viewport
    height: "100vh", // Full height of viewport
    objectFit: "contain", // Crop the video to fill the space
    marginTop: "-20vh",
  },
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

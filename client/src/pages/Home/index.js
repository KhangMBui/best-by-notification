import React from "react";
import Webcam from "react-webcam";
import Stylesheet from "reactjs-stylesheet";
import Tesseract from "tesseract.js";
import Image from "image.js";
import "./../../assets/fonts/fonts.css";

function Home() {
  return (
    <div style={styles.homeStyle}>
      <h1 style={styles.titleStyle}>BEST BY NOTIFICATION</h1>
      <WebcamCapture />
    </div>
  );
}

// const videoConstraints = {
//   // width: 1080,
//   // height: 1920,
//   facingMode: "environment",
// };

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [text, setText] = React.useState(""); // State for extracted text
  const [loading, setLoading] = React.useState(false); // State for loading indicator

  // ---------------------
  // Preprocess Image
  // ---------------------
  const preprocessImage = async (imageSrc) => {
    const image = await Image.load(imageSrc);
    const greyImage = image.Grey(); // Convert to grayscale
    const thresholdImage = greyImage.mask({ threshold: 0.7 }); // Apply thresholding
    return thresholdImage.toDataURL(); // Return preprocessed image as base64
  };

  // ---------------------
  // Extract Date
  // ---------------------
  const extractDate = (text) => {
    // const datePattern =
    //   /(EXP\s*\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})|(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i;
    const datePattern = /.+/;
    const match = text.match(datePattern);
    return match ? match[0] : "No date found"; // Return match or fallback
  };

  // ---------------------
  // Capture and Recognize
  // ---------------------
  const captureAndRecognize = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture screenshot
    if (imageSrc) {
      setLoading(true); // Show loading indicator
      try {
        // Preprocess the image
        const preprocessedImage = await preprocessImage(imageSrc);

        // Perform OCR on the preprocessed image
        const {
          data: { text },
        } = await Tesseract.recognize(preprocessedImage, "eng", {
          tessedit_char_whitelist: "0123456789/-EXP", // Filter characters
          logger: (info) => console.log(info), // Log progress
        });

        // Extract expiration date
        const extractedDate = extractDate(text);
        setText(extractedDate); // Update state with the date
      } catch (error) {
        console.error("Error recognizing text:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  }, [webcamRef]); // Depend on webcamRef

  // ---------------------
  // Return JSX
  // ---------------------
  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment", // Rear-facing camera
        }}
        style={styles.webcam}
      />
      <button
        style={styles.buttonStyle}
        onClick={WebcamCapture.captureAndRecognize}
      >
        {loading ? "Processing..." : "Scan Expiration Date"}
      </button>
      <h2 style={styles.dateTextStyle}>
        {text || "Expiration date will appear here."}
      </h2>
    </>
  );
};

// const WebcamCapture = () => {
//   const webcamRef = React.useRef(null);
//   return (
//     <>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={videoConstraints}
//         style={styles.webcam}
//       />
//     </>
//   );
// };

const styles = Stylesheet.create({
  webcam: {
    width: "100vw", // Full width of viewport
    height: "30vh", // Full height of viewport
    objectFit: "fill", // Crop the video to fill the space
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
  buttonStyle: {
    marginTop: "2vh",
    padding: "10px 20px",
    fontSize: "1.2em",
    cursor: "pointer",
  },
  dateTextStyle: {
    marginTop: "2vh",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
});

export default Home;

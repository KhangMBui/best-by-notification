import React, { useState, useEffect } from "react";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Email submitted successfully!");
      } else {
        alert(`Failed to signup: ${data.error}`);
      }
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };
  return (
    <div style={styles.signupContainerStyle}>
      <h1 style={styles.signupTitleStyle}>BEST BY NOTIFICATION</h1>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} style={styles.signupFormStyle}>
          <Form.Group style={styles.formGroupStyle} controlId="formBasicEmail">
            <Form.Control
              style={styles.inputStyle}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Form.Control
              style={styles.inputStyle}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Form.Control
              style={styles.inputStyle}
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </Form.Group>
          <Button style={styles.buttonStyle} variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

const styles = Stylesheet.create({
  buttonStyle: {
    padding: "1.3vw",
    paddingTop: "1.6vh",
    paddingBottom: "1.6vh",
    width: "110%",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "4vw",
    marginTop: "0.7vh",
    backgroundColor: "#000",
    color: "#FFF",
  },
  inputStyle: {
    height: "3.5vh",
    width: "100%",
    padding: "1.3vh",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "4vw",
    paddingLeft: "4vw",
    paddingBottom: "0.8vh",
    marginBottom: "1.7vh",
  },
  signupFormStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  formGroupStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: "-7vw",
    marginTop: "2vh",
    width: "100%",
  },
  // emailLabelStyle: {
  //   fontFamily: "GothicA1-Regular",
  //   fontSize: "4.3vw",
  //   paddingBottom: "0.8vh",
  // },
  signupTitleStyle: {
    fontFamily: "GothicA1-Regular",
    borderBottom: "3px solid black", // Adds a black underline
    // paddingBottom: "1px", // Adds some space between the text and the underline
    marginBottom: "5vh",
    fontSize: "8vw",
  },
  signupContainerStyle: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    marginTop: "4vh",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default SignupForm;

import React from "react";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import InputForm from "./pages/InputForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signupform" element={<SignupForm />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="inputform" element={<InputForm />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";

function InputForm() {
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const navigate = useNavigate();

  // Handles opening/closing the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs:
    if (!productName || !expirationDate) {
      alert("Please fill out all fields.");
      return;
    }

    // Get user ID
    const userId = sessionStorage.getItem("userId");

    // API URL for adding product
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user/${userId}/add_product`;

    // Prepare request payload
    const requestBody = {
      name: productName,
      expiration_date: expirationDate,
    };

    try {
      // Send POST request to backend
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Success message
        // toggleModal(); //// Close the modal (Optional)
      } else {
        alert(`Error: ${data.error}`); // Error message
      }
    } catch (error) {
      console.log("Error adding product:", error);
      alert("Failed to add product. Please try again later. Error: " + error);
      alert(`User ID: ${userId}`); // Debugging
    }

    // Clear inputs after submission
    setProductName("");
    setExpirationDate("");

    // Close the modal
    // toggleModal();
  };

  return (
    <div style={styles.homeContainerStyle}>
      <h1 style={styles.appTitleStyle}>BEST BY NOTIFICATION</h1>
      <h2 style={styles.homeTitleStyle}>HOME</h2>
      <Logo />

      {/* Buttons for Actions */}
      <div style={styles.buttonContainer}>
        <button style={styles.actionButton} onClick={toggleModal}>
          Add Product
        </button>
        <button
          style={styles.actionButton}
          onClick={() => navigate("/DatabaseView")}
        >
          View Database
        </button>
      </div>

      {/* Sign Out Link */}
      <div style={styles.signoutLinkStyle}>
        <Link
          to="/LoginForm"
          style={{
            ...styles.signoutLink,
            ...(isLinkHovered ? styles.signoutLinkHover : {}),
          }}
          onMouseEnter={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
        >
          Sign Out
        </Link>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h2 style={styles.modalTitle}>Add Food Product</h2>

            {/* Input Fields */}
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={styles.inputField}
            />

            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              style={styles.inputField}
            />

            {/* Buttons for Modal */}
            <div style={styles.modalButtons}>
              <button style={styles.modalActionButton} onClick={handleSubmit}>
                Submit
              </button>
              <button style={styles.modalActionButton} onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = Stylesheet.create({
  appTitleStyle: {
    fontFamily: "GothicA1-Regular",
    borderBottom: "3px solid black",
    fontSize: "8vw",
  },
  homeTitleStyle: {
    fontFamily: "GothicA1-Regular",
    marginBottom: "5vh",
    marginTop: "-1vh",
    fontSize: "8vw",
  },
  homeContainerStyle: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    marginTop: "4vh",
  },
  signoutLinkStyle: {
    marginTop: "44vh",
    textAlign: "end",
    color: "#1877F2",
  },
  signoutLink: {
    textDecoration: "none",
    color: "inherit",
  },
  signoutLinkHover: {
    textDecoration: "underline",
  },
  buttonContainer: {
    marginTop: "4vh",
    display: "flex",
    gap: "10px",
  },
  actionButton: {
    padding: "5px 30px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "12px",
    border: "1px solid #ccc",
    backgroundColor: "#000",
    color: "#FFF",
    flex: 1,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  inputField: {
    margin: "10px 0",
    padding: "8px",
    width: "93%",
    borderRadius: "8px",
    border: "1px solid #cccc",
    fontFamily: "GothicA1-Regular",
  },
  modalTitle: {
    fontFamily: "GothicA1-Regular",
    fontSize: "5.5vw",
    textAlign: "center",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    gap: "45px",
  },
  modalActionButton: {
    padding: "8px 10px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "12px",
    border: "1px solid #ccc",
    backgroundColor: "#000",
    color: "#FFF",
    flex: 1,
  },
});

export default InputForm;

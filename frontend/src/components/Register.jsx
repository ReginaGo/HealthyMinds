import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/register.css"; // Importa el archivo CSS con las nuevas clases

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to register");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      {/* Nubes decorativas */}
      <div className="register-cloud register-cloud1"></div>
      <div className="register-cloud register-cloud2"></div>
      <div className="register-cloud register-cloud3"></div>

      {/* Formulario de registro */}
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registration</h1>
        <h3>Join us for a healthier mind</h3>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Register</button>
        <span>Already have an account?</span>
        <a href="/login">Log in</a>
      </form>
    </div>
  );
};

export default Register;

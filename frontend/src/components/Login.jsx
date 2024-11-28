import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/register.css"; // Importa el CSS específico para el componente

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Permite enviar cookies de sesión
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid username or password");
          }
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        navigate("/"); // Redirige al home usando `useNavigate`
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage(error.message || "Failed to log in.");
      });
  };

  return (
    <div className="login-container">
      {/* Nubes decorativas */}
      <div className="login-cloud login-cloud1"></div>
      <div className="login-cloud login-cloud2"></div>
      <div className="login-cloud login-cloud3"></div>

      {/* Formulario de inicio de sesión */}
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Log in</h1>
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

        {/* Mensaje de error */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Login</button>
        <span>Don't have an account yet?</span>
        <a href="/register">Create one</a>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api"
import "../Css/register.css"; // Importa el CSS específico para el componente

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realiza la solicitud POST con Axios
      const response = await api.post(
        "/login", // Endpoint del backend
        { name, password }, // Datos a enviar
        {
          withCredentials: true, // Necesario para enviar cookies de sesión
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Procesa la respuesta exitosa
      console.log("Login successful:", response.data);
      navigate("/"); // Redirige al home
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        // El servidor respondió con un error
        if (error.response.status === 401) {
          setErrorMessage("Invalid username or password");
        } else {
          setErrorMessage(`Error: ${error.response.status}`);
        }
      } else if (error.request) {
        // La solicitud se envió pero no hubo respuesta
        setErrorMessage("No response from server. Please try again later.");
      } else {
        // Error al configurar la solicitud
        setErrorMessage(error.message || "Failed to log in.");
      }
      console.error("Login error:", error);
    }
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

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  let apiPath = "";

if (process.env.NODE_ENV === "production") {
  apiPath = "https://backend-kv8d.onrender.com"; // URL del backend en producción
} else {
  apiPath = "http://localhost:5001"; // URL del backend en desarrollo
}


  const handleLogout = (e) => {
    e.preventDefault(); // Prevenir comportamiento predeterminado
    fetch(apiPath + "/logout", {
      method: "GET",
      credentials: "include", // Asegura que se envíen las cookies de sesión
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login"); // Redirige al login después de cerrar sesión
        } else {
          console.error("Error al cerrar sesión");
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
      }}
      className="navbar navbar-expand-lg navbar-dark bg-primary"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Healthy Minds
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/conditions">
                Discover
              </Link>
            </li>
            <li className="nav-item">
              {/* Cambiamos el Link por un botón para el logout */}
              <button
                className="nav-link btn btn-link text-white"
                style={{ textDecoration: 'none' }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
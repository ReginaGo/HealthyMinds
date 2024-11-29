import axios from "axios";

let apiPath = "";

if (process.env.NODE_ENV === "production") {
  apiPath = "https://healthyminds-1.onrender.com"; // URL del backend en producción
} else {
  apiPath = "http://localhost:5000"; // URL del backend en desarrollo
}

const api = axios.create({
  baseURL: apiPath, // Configura la URL base dependiendo del entorno
  headers: {
    "Content-Type": "application/json", // Asegura el tipo de contenido
  },
  withCredentials: true, // Permite enviar cookies y credenciales si es necesario
});

export default api;

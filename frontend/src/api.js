import axios from "axios";

let apiPath = "";

if (process.env.NODE_ENV === "production") {
  apiPath = "/api";
} else {
  apiPath = "http://localhost:5000"; // Cambia esto si tu backend usa un puerto diferente
}

const api = axios.create({
  baseURL: apiPath,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

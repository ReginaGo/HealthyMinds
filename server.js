
require("dotenv").config();
const explicitWords = require('./bad-words.json');

const cors = require('cors');
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user");
const blogPost = require("./models/blogPost");
const app = express();
const session = require("express-session");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// Middleware de sesión


// app.use(
//   cors({
//     origin: "https://bien.onrender.com", // Reemplaza con la URL de tu frontend
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bien.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

console.log(process.env.SESSION_SECRET)
// Configuración de sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret-key", // Cambia esto en producción
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Solo HTTPS en producción
      httpOnly: true, // Protege las cookies de JavaScript
      sameSite: "lax" , // "none" en producción, "lax" en desarrollo
    },
  })
);

// MongoDB connection
const mongoUrl = `mongodb+srv://${process.env.MONGUSER}:${process.env.MONGPASS}@cluster0.7d4m3.mongodb.net/${process.env.MONGDB}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// Rutas
app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });

    if (user) {
      req.session.username = user.name; // Configura la sesión
      res.status(200).json({ message: "Login successful", username: user.name }); // Responde con JSON
    } else {
      res.status(401).json({ message: "Error: User or Password incorrect" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(400);
    }

    const newUser = new User({ name, password });
    await newUser.save();
    req.session.username = newUser.name;
    res.redirect("/");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("An error occurred while logging out.");
    }
    res.redirect("/login");
  });
});

app.get("/blog", async (req, res) => {
  try {
    if (!req.session.username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const posts = await blogPost.find().sort({ createdAt: -1 }); // Ordenar por fecha
    res.json({ username: req.session.username, posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/create-post", async (req, res) => {
  try {
    if (!req.session.username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description } = req.body;

    // Validación: Título y descripción requeridos
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    // Validación: Número máximo de palabras
    const wordCount = description.split(/\s+/).length;
    if (wordCount > 500) {
      return res.status(400).json({ message: "Your post exceeds the 500-word limit." });
    }

    // Validación: Filtrar palabras explícitas usando bad-words.json
    const containsExplicitWords = explicitWords.some((explicitWord) => {
      const regex = new RegExp(`\\b${explicitWord}\\b`, 'i'); // Busca coincidencias exactas
      return regex.test(description);
    });
    if (containsExplicitWords) {
      return res.status(400).json({ message: "Your post contains inappropriate language." });
    }

    // Crear y guardar el post
    const newPost = new blogPost({
      username: req.session.username,
      title,
      description,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/", (req, res) => {
  const username = req.session.username;
  console.log(username);
  if (!username) {
    return res.status(401).json({ message: "Unauthorized: Please log in." });
  }
  res.json({ username });
});


app.get("/conditions", (req, res) => {
  fs.readFile("Data/MH-conditions.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading data" });
    }
    const conditions = JSON.parse(data);
    res.json({ conditions });
  });
});

app.get("/condition/:id", (req, res) => {
  const conditionId = req.params.id;
  fs.readFile("./Data/MH-conditions.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading data" });
    }
    const conditions = JSON.parse(data);
    const condition = conditions.find((c) => c.id === conditionId);
    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }
    res.json({ condition });
  });
});

app.get("/register", (req, res) => {
  res.status(200).json({ errorMessage: null });
});

app.get("/login", (req, res) => {
  res.status(200).json({ errorMessage: null });
});

app.get("/mood", (req, res) => {
  res.status(200).json({ message: "Mood page" });
});

const PORT = process.env.PORT || 5001; // Cambié el puerto a 5001
app.listen(PORT, () => {
  console.log(`PP team Rafa listening on port ${PORT}`);
});

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, 'build'),
{
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

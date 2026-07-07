require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// 1. Log TOUTES les requêtes qui arrivent
app.use((req, res, next) => {
  console.log(`>>> RECU: ${req.method} ${req.url}`)
  next()
})

app.use(cors());
app.use(express.json());

// 2. Route de test SANS router, direct dans app.js
app.post("/api/experiences", (req, res) => {
  console.log('>>> Body:', req.body)
  res.status(201).json({ msg: "ROUTE DIRECTE OK", data: req.body })
})

// 3. Ton router après
const experienceRoutes = require("./routes/experience.routes");
app.use("/api/experiences", experienceRoutes);

// 4. Catch-all 404 pour voir ce qui passe
app.use((req, res) => {
  console.log(`>>> 404 sur: ${req.method} ${req.url}`)
  res.status(404).json({ 
    error: "Route non trouvée",
    method: req.method,
    url: req.url
  })
})

module.exports = app;

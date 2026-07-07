const express = require("express");
const router = express.Router();

//const { createExperience } = require("../controllers/experience.controller");

//router.post("/", createExperience);

const { createExperience } = require("../controllers/experience.controller");
console.log("createExperience =", createExperience); // Doit afficher [Function]

router.post("/", createExperience);

module.exports = router;
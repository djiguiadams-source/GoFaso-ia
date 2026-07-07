const { v4: uuidv4 } = require("uuid");

let experiences = []; // temporaire (RAM)


exports.createExperience = (req, res) => {
  const { title, description, priceTokens } = req.body;

  const newExperience = {
    id: uuidv4(),
    title,
    description,
    priceTokens: priceTokens || 10,
    createdAt: new Date()
  };

  experiences.push(newExperience);

  res.json(newExperience);
  
};
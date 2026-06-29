require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();



app.use(cors());
//app.use(express.json());
app.use(express.json()); // Si vous utilisez Express
// OU si vous utilisez le module 'router' et 'body-parser' visible dans vos logs :
const bodyParser = require('body-parser');
router.use(bodyParser.json());


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es le guide officiel de l'Hôtel Demo.Tu réponds uniquement à partir des informations fournies. Si tu ne connais pas une information, tu réponds : "Je ne dispose pas de cette information actuellement." Tu ne dois jamais inventer."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});
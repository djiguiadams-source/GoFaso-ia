const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
    const { message, experience } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
Tu es un guide virtuel pour une visite immersive 360°.

Contexte de l'expérience :
${experience?.title || "Non défini"}
${experience?.description || ""}

Règles :
- Réponds uniquement en tant que guide
- Sois concis et utile
- Ne fabrique pas d'informations
          `
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
};
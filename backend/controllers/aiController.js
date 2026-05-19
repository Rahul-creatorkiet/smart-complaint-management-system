const analyzeComplaint = require("../utils/aiService");

const analyzeAI = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const result = await analyzeComplaint(
      title,
      description,
      category
    );

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { analyzeAI };
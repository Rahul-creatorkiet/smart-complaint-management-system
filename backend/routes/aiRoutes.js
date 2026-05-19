const express = require("express");
const { analyzeAI } = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/analyze", protect, analyzeAI);

module.exports = router;
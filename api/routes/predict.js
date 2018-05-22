const express = require("express");
const router = express.Router();

const PredictionController = require('../controllers/predict');

router.get("/", PredictionController.get_prediction);

module.exports = router;

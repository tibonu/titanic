const express = require("express");
const router = express.Router();

const StatisticsController = require('../controllers/stat');

router.get("/", StatisticsController.get_statistics);

module.exports = router;

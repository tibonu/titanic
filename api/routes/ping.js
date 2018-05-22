const express = require("express");
const router = express.Router();

const PingController = require('../controllers/ping');

router.get("/", PingController.ping);

module.exports = router;

const express = require("express");
const router = express.Router();

const PassengerController = require('../controllers/passenger');

router.get("/", PassengerController.search_passengers);

router.get("/:passengerId", PassengerController.get_passenger);

router.delete("/:passengerId", PassengerController.delete_passenger);

module.exports = router;

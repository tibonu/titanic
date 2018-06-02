const express = require("express");
const app = express();
const morgan = require("morgan");

const passengerRoutes = require("./api/routes/passenger");
const statRoutes = require("./api/routes/stat");
const predictRoutes = require('./api/routes/predict');
const pingRoutes = require('./api/routes/ping');


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain);

app.use(morgan("dev"));

// Routes which should handle requests
app.use("/passengers", passengerRoutes);
app.use("/stats", statRoutes);
app.use("/predicts", predictRoutes);
app.use("/greetings", pingRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;


"use strict";

const DB = require('../data/titanicdb');
const UTILS = require('../utils/utils');

exports.get_prediction = (req, res, next) => {

  let randomness = 20.0;
  if (req.query.hasOwnProperty("rnd")) {
    randomness = req.query["rnd"];
  }

  let passengers = DB().get();
  const totalCount = passengers.length;

  let criteria = UTILS.build_query_criteria(req);
  delete criteria.name;
  delete criteria.survived; 
  delete criteria.ticketId;
  delete criteria.embark;
  delete criteria.dest;

  passengers = DB(criteria).get();
  const sampleCount = passengers.length;

  criteria.survived = true;
  passengers = DB(criteria).get();
  const survivalCount = passengers.length;
  
  let minSurvivalRatio = -1;
  let maxSurvivalRatio = -1;
  let avgSurvivalRatio = -1;
  let deviation = -1;
  if (sampleCount > 0) {
    avgSurvivalRatio = 100.0 * survivalCount / sampleCount;
    deviation = avgSurvivalRatio * randomness / 100.0;
    minSurvivalRatio = avgSurvivalRatio - deviation;
    maxSurvivalRatio = avgSurvivalRatio + deviation;
    if (maxSurvivalRatio > 100.0) {
      maxSurvivalRatio = 100.0;
    }
  }

  res.status(200).json({
    avgSurvivalChance: avgSurvivalRatio,
    deviation: deviation,
    minSurvivalChance: minSurvivalRatio,
    maxSurvivalChance: maxSurvivalRatio
  });
};

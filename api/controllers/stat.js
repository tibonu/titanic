
"use strict";

const DB = require('../data/titanicdb');
const UTILS = require('../utils/utils');

exports.get_statistics = (req, res, next) => {

  let passengers = DB().get();
  const totalCount = passengers.length;

  let criteria = UTILS.build_query_criteria(req);
  passengers = DB(criteria).get();
  const sampleCount = passengers.length;

  criteria.survived = true;
  passengers = DB(criteria).get();
  const survivalCount = passengers.length;
  
  let weight = -1;
  if (totalCount > 0) {
    weight = 100 * sampleCount / totalCount;
  }

  let survivalRatio = -1;
  if (sampleCount > 0) {
    survivalRatio = 100 * survivalCount / sampleCount;
  }

  res.status(200).json({
    total: totalCount,
    matching: sampleCount,
    weight: weight,
    survived: survivalCount,
    survivalRatio: survivalRatio
  });
};

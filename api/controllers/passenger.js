
"use strict";

const DB = require('../data/titanicdb');
const UTILS = require('../utils/utils');

exports.search_passengers = (req, res, next) => {
  let criteria = UTILS.build_query_criteria(req);
  let passengers = DB(criteria).get();
  res.status(200).json({
    count: passengers.length,
    passengers: passengers
  });
};

exports.get_passenger = (req, res, next) => {
  const id = parseInt(req.params.passengerId);
  let passenger = DB({id: id}).get()[0];
  if (passenger) {
    res.status(200).json({
      status: "found",
      passenger: passenger
    });
  }
  else {
    res.status(404).json({
      status: "not found"
    });
  }
};

exports.delete_passenger = (req, res, next) => {
  const id = parseInt(req.params.passengerId);
  let passenger = DB({id: id}).get()[0];
  if (passenger) {
    DB().remove({id: id});
    res.status(200).json({
      status: "deleted",
      passenger: passenger
    });
  }
  else {
    res.status(404).json({
      status: "not found"
    });    
  }
};

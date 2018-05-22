
"use strict";

const DB = require('../data/titanicdb');

exports.search_passengers = (req, res, next) => {
  let criteria = build_query_criteria(req);
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

function build_query_criteria(req) {
  var criteria = {};
  for (var pname in req.query) {
    if (req.query.hasOwnProperty(pname)) {
      var pvalue = req.query[pname];
      if (pname == "class") {
        criteria.class = parseInt(pvalue);
      }
      else if (pname == "name") {
        criteria.name = {likenocase: pvalue};
      }
      else if (pname == "survived") {
        criteria.survived = (pvalue === "true");
      }
      else if (pname == "gender") {
        criteria.gender = {likenocase: pvalue};
      }
      else if (pname == "boat") {
        criteria.boat = pvalue;
      }
      else if (pname == "ticket") {
        criteria.ticketId = pvalue;
      }
      else if (pname == "cabin") {
        criteria.cabin = {isUndefined: false, likenocase: pvalue};
      }
      else if (pname == "embark") {
        criteria.portOfEmbarkation = {likenocase: pvalue};
      }
      else if (pname == "dest") {
        criteria.destination = {isUndefined: false, likenocase: pvalue};
      }
      else if (pname == "agemin") {
        if (criteria.age) {
          criteria.age.gte = pvalue;
        }
        else {
          criteria.age = {gte: pvalue};
        }
      }
      else if (pname == "agemax") {
        if (criteria.age) {
          criteria.age.lte = pvalue;
        }
        else {
          criteria.age = {lte: pvalue};
        }
      }
    }
  }
  console.log(criteria);
  return criteria;
}
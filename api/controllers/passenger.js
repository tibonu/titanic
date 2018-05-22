
const DB = require('../data/titanicdb');

exports.search_passengers = (req, res, next) => {
  let allPassengers = DB({name:{likenocase:"John"}}).get();
  let criteria = build_query_criteria(req);
  res.status(200).json({
    message: "search_passengers"
  });
};

exports.get_passenger = (req, res, next) => {
  const id = req.params.passengerId;
  res.status(200).json({
    message: `get_passenger: ${id}`
  });
};

exports.delete_passenger = (req, res, next) => {
  const id = req.params.passengerId;
  res.status(200).json({
    message: `delete_passenger: ${id}`
  });
};

function build_query_criteria(req) {
  var criteria = {};
  for (var pname in req.query) {
    if (req.query.hasOwnProperty(pname)) {
      var pvalue = req.query[pname];
      if (pname === "class") {
        criteria.class = pvalue;
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
      
        console.log(pname, req.query[pname]);
    }
  }
  return criteria;
}
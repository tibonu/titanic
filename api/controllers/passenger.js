
const DB = require('../data/titanicdb');

exports.search_passengers = (req, res, next) => {
  let allPassengers = DB({name:{likenocase:"John"}}).get();
  console.log(allPassengers);
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


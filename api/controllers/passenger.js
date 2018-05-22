
exports.search_passengers = (req, res, next) => {
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


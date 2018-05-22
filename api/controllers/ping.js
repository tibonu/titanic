
exports.ping = (req, res, next) => {
  const os = require('os');
  const hostname = os.hostname();
  const ver = process.env.npm_package_version;
  const port = req.socket.localPort;
  res.status(200).json({
    message: `pong (host: ${hostname}:${port}, ver: ${ver})`
  });
};


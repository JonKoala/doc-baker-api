module.exports = function(err, req, res, next) {
  if (res.headersSent)
    return next(err);

  res.status(500).json({
    type: err.name,
    message: err.message
  });
}

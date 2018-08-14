module.exports = class AppError extends Error {

  constructor (message, status) {

    super(message);

    this.name = 'DocBakerError';
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }

};

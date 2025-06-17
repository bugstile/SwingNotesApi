import { AppError } from '../errors/error.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);

  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'Something went wrong',
  });
};

export const notFoundHandler = (req, _, next) => {
  next(new AppError(`Could not find ${req.originalUrl}`, 404));
};

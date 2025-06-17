import jwt from 'jsonwebtoken';
import { UnauthenticatedError, ForbiddenError } from '../errors/error.js';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new UnauthenticatedError('Missing or invalid token'));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ForbiddenError('Token is invalid or expired'));
    }

    req.user = decoded;
    console.log(req.user);
    next();
  });
};

export default verifyJWT;

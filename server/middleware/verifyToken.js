import jwt from 'jsonwebtoken';
import models from '../models/index';

// Secret key
const secret = process.env.secretKey;
// Users model
const { User } = models;

const verifyToken = {
  tokenVerification: (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      // Forbidden
      return res.status(403).json({
        message: 'Kindly sign in',
        error: true
      });
    }
    req.token = bearerHeader;
    jwt.verify(req.token, secret, (err, authData) => {
      if (err) {
        // Wrong token
        return res.status(403).json({
          message: 'Kindly sign in',
          error: true
        });
      }
      req.authData = authData;
      User
        .findOne({
          where: {
            id: authData.id
          }
        })
        .then((user) => {
          if (!user) {
            return res.status(401).send({
              message: 'Ooops! You cannot perform this action!',
            });
          }
          return next();
        });
    });
  }
};

export default verifyToken;

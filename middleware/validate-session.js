import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import { sequelize } from '../db.js';
import { UserModel } from '../models/user.js';

const User = UserModel(sequelize, Sequelize.DataTypes);

export function authenticate(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next(); // allowing options as a method for request
  }

  const sessionToken = req.headers.authorization;
  if (!sessionToken) {
    return res.status(403).json({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(
    sessionToken,
    'lets_play_sum_games_man',
    (error, decoded) => {
      if (decoded) {
        User.findOne({ where: { id: decoded.id } })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((error) => {
            res.status(401).json({ message: 'Not authorized' });
          });
      } else {
        res.status(400).json({ message: 'Not authorized' });
      }
    },
  );
}

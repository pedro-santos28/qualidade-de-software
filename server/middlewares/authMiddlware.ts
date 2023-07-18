import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const secret = process.env.JWT_SECRET;
dotenv.config();

export function requireAuth(req, res, next) {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
}

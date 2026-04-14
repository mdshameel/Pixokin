import { User } from '../models/User.js';
import { verifyToken } from '../utils/auth.js';
import { env } from '../config/env.js';

export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }

  const token = header.split(' ')[1];
  try {
    const payload = verifyToken(token, env.jwtSecret);
    req.user = await User.findById(payload.sub).select('-passwordHash');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

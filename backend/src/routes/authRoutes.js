import { Router } from 'express';
import { User } from '../models/User.js';
import { comparePassword, hashPassword, signToken } from '../utils/auth.js';
import { env } from '../config/env.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email, passwordHash });
  const token = signToken({ sub: user._id }, env.jwtSecret, env.jwtExpiresIn);

  return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await comparePassword(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ sub: user._id }, env.jwtSecret, env.jwtExpiresIn);

  return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

export default router;

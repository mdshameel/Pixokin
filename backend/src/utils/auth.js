import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signToken = (payload, secret, expiresIn) => jwt.sign(payload, secret, { expiresIn });
export const verifyToken = (token, secret) => jwt.verify(token, secret);
export const hashPassword = (password) => bcrypt.hash(password, 10);
export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

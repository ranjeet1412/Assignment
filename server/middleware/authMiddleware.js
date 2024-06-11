import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const isManager = (req, res, next) => {
  // console.log("called")
  if (req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

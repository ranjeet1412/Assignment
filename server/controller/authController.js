import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
import "dotenv/config";

export const registerController = async (req, res) => {
  try {
    const { username, password, role, location } = req.body;

    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with the same username' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      role,
      location
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Create JWT token
    const tokenData = {
      id: user._id,
      username: user.username,
      role: user.role
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    // Set the token as a cookie and send response
    res.cookie('access_token', token, { httpOnly: true });
    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

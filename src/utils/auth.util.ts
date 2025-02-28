import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import mongoose from "mongoose";

// Define UserType interface
interface UserType {
  _id: mongoose.Types.ObjectId;
  name: string;
  username: string;
  password: string;
}

// ✅ Login function
export async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Please provide username and password" });
      return;
    }

    const user: UserType | null = await User.findOne({ username }).lean<UserType>();

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      res.status(500).json({ message: "JWT Secret not configured" });
      return;
    }

    const token = jwt.sign({ username: user.username, _id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
}

// ✅ SignUp function
export async function SignUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, username, password } = req.body;

    if (!username || !password || !name) {
      res.status(400).json({ message: "Please provide name, username, and password" });
      return;
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, username, password: hashedPassword });

    res.status(201).json({ message: "Signup successful", userId: newUser._id });
    return;
  } catch (error) {
    next(error);
  }
}

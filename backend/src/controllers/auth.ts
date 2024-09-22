import { Request, Response } from "express";
import User from "../models/user";
import { CreateUserType, loginTypes } from "../types/all";
import bcrypt from "bcrypt";
import genTokenSetCookie from "../utils/genTokenSetCookie";
import jwt from 'jsonwebtoken';

const signUp = async (req: Request, res: Response) => {
  const { firstName, middleName, lastName, email, password }: CreateUserType = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (user) {
      // Generate cookie here
      const token = genTokenSetCookie(res, user);
      res.status(201).json({
        user: {
          id: user._id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      });
    } else {
      res.status(400).json({ error: "Couldn't create user" });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password }: loginTypes = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only set secure in production
      sameSite: "none",
    });
    res.status(200).json({ message: "Logged out" });
  } catch (error: any) {
    console.error("Error occurred during logout", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signUp, login, logout };

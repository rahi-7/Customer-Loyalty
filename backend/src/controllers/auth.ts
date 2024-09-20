import { Request, Response } from "express";
import User from "../models/user";
import { CreateUserType, loginTypes } from "../types/all";
import bcrypt from "bcrypt";
import genTokenSetCookie from "../utils/genTokenSetCookie";

const signUp = async (req: Request, res: Response) => {
  const { firstName, middleName, lastName, email, password }: CreateUserType =
    req.body;

  try {
    // check if there is any entry with the same email
    const userExists = await User.findOne({ email });

    if (userExists)
      return res
        .status(400)
        .json({ error: "user with this email already exists" });

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      password,
    });

    if (user) {
      //gen cookie here
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
      res.status(400).json({ error: "couldn't create user:" });
    }
  } catch (err: any) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password }: loginTypes = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        // Ensure genTokenSetCookie does not send a response
        const token = genTokenSetCookie(res, user);
        if (!res.headersSent) {
          res.status(200).json({
            message: "login successful",
            user: {
              userId: user._id,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
              email: user.email,
            },
            token: token,
          });
        }
      } else {
        if (!res.headersSent) {
          res.status(400).json({ error: "invalid credentials" });
        }
      }
    } else {
      if (!res.headersSent) {
        res.status(400).json({ error: "invalid credentials" });
      }
    }
  } catch (err: any) {
    if (res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("error occurred during login", err);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "logged out" });
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("error occured during logout", error);
  }
};

export { signUp, login, logout };

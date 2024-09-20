import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../config";
import { UserTypes } from "../types/all";

interface IUserModel extends UserTypes, Document {}

const userSchema = new mongoose.Schema<IUserModel>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(config.server.rounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log("error occured on saving user data", error);
  }
});

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;

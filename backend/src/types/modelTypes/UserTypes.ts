import mongoose, { Document } from "mongoose";

export interface IUser {
  fullName: string;
  phoneNumber: string;
  loyalityPoints: number;
}

export interface IUserModel extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserModel>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  loyalityPoints: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IUserModel>("User", userSchema);


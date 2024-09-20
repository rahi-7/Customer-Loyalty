import mongoose from "mongoose";
import { CustomerType } from "../types/all";

interface ICustomerModel extends CustomerType, Document {}

const customerSchema = new mongoose.Schema<ICustomerModel>({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumer: {
    type: String,
    required: true,
  },
  loyalityPoints: {
    type: Number,
    required: true,
    unique: true,
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

const Customer = mongoose.model<ICustomerModel>("Customer", customerSchema);

export default Customer;

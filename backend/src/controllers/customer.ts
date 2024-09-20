import { Request, Response } from "express";
import Customer from "../models/customer";
import { CreateCustomerType, CreatePurchaseType } from "../types/all";
import { json } from "stream/consumers";

export const createCustomer = async (req: Request, res: Response) => {
  const { fullName, phoneNumber }: CreateCustomerType = req.body;

  try {
    // check for an existing customer with phoneNumber

    const tempPhone = phoneNumber.trim();

    const customer = await Customer.create({ fullName, tempPhone });

    if (customer) {
      res
        .status(201)
        .json({ customer, message: "customer created successfully" });
    } else {
      res.status(500).json({ error: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res
      .status(200)
      .json({ customers, message: "customers fetched successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerByPhone = async (req: Request, res: Response) => {
  let phone = req.params.phone;
  phone = phone.trim();
  // phone from path param with key phone
  const customer = await Customer.findOne({ phoneNumber: phone });

  if (customer) {
    res
      .status(200)
      .json({ customer, message: "customer fetched successfully" });
  } else {
    res.status(404).json({ message: "customer not found" });
  }
};

export const purchase = async (req: Request, res: Response) => {
  const purchase: CreatePurchaseType = req.body;

  try {
    let tempPhone = purchase.customerPhoneNumber.trim();
    const customer = await Customer.findOne({ phoneNumber: tempPhone });

    if (customer) {
      customer.loyalityPoints += purchase.numberOfItems;
      customer.loyalityPoints += Math.floor(purchase.totalAmount / 10);

      const saved = await customer.save();

      res.status(200).json({ customer: saved, message: "purchase successful" });
    } else {
      res
        .status(404)
        .json({ message: "customer with this phone number not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log(err);
  }
};

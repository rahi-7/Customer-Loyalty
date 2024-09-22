import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerByPhone,
  purchase,
  redeemPoints,
} from "../controllers/customer";

const router = express.Router();

// Route to create a customer
router.post("/create_customer", createCustomer);

// Route to get all customers
router.get("/get_all_customers", getAllCustomers);

// Route to get a customer by phone number (GET method)
router.get("/get_customer_by_phone/:phone", getCustomerByPhone);

// Route to handle customer purchases
router.post("/purchase", purchase);

// Route to redeem points for a customer
router.post("/redeem_points/:phone/:points", redeemPoints);

export = router;

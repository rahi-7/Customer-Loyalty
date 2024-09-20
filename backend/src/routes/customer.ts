import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerByPhone,
  purchase,
  redeemPoints,
} from "../controllers/customer";

const router = express.Router();

router.post("/create_customer", createCustomer);
router.get("/get_all_customers", getAllCustomers);
router.get("/get_customer_by_phone/:phone", getCustomerByPhone);
router.post("/purchase", purchase);
router.post("/redeem_points/:phone/:points", redeemPoints);

export = router;

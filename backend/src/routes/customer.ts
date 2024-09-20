import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerByPhone,
  purchase,
} from "../controllers/customer";

const router = express.Router();

router.post("/create_customer", createCustomer);
router.get("/get_all_customers", getAllCustomers);
router.get("/get_customer_by_phone/:phone", getCustomerByPhone);
router.post("/purchase", purchase);

export = router;

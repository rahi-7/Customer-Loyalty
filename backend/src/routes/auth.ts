import express from "express";
import { login, signUp } from "../controllers/auth";

const router = express.Router();

router.post("/create_user", signUp);

router.post("/login", login);

export = router;

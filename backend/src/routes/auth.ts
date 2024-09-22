import express from 'express';
import { login, signUp } from '../controllers/auth'; // Make sure these controllers exist and are properly set up

const router = express.Router();

// Route for signing up users
router.post('/create_user', signUp);

// Route for logging in users
router.post('/login', login);

export default router;



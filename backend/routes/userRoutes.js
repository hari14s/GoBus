import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, getAllUsers, DetailsUser } from '../controllers/userController.js';
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/details', DetailsUser);

// admin only
router.get('/', protect, adminOnly, getAllUsers); 

export default router;
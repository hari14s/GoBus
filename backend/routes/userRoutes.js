import { Router } from 'express';
import { registerUser, loginUser, getProfile, updateProfile, getAllUsers, DetailsUser } from '../controllers/userController.js';
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.get('/details', protect, DetailsUser);
router.get('/profile/:id', protect, getProfile);
router.put('/profile/:id', protect, updateProfile);

// admin only
router.get('/', protect, adminOnly, getAllUsers); 

export default router;
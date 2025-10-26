import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sign } from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
};

// Register new passenger
export async function registerUser(req, res) {
  try {
    const { username, phone, email, password, user_role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userType = user_role;

    if(userType === "Driver" || userType === "Conductor") userType = "Employee";

    const user = await create({ 
        username, 
        phone,
        email, 
        password: hashedPassword,
        userType 
    });
    res.status(201).json({message: "User Registration successful"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//Get details of Employee after regsitering
export async function DetailsUser(req, res){
  try{
    const { first_name, last_name, dob, phone, employee_type, license_no, gender} = req.body;
    const Employee = await create ({
      first_name, last_name, dob, phone, employee_type, license_no, gender
    });
    res.status(200).json({message: "Employee Detils updated"});
  } catch(err){
    res.status(400).json({error: err.message});
  }
}

// Login for all users
export async function loginUser(req, res) {
    try{
        const { email, password } = req.body;
        const user = await findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            _id: user._id,
            name: user.username,
            email: user.email,
            usertype: user.usertype,
            token
        });
    }catch(error){
    res.status(500).json({ message: error.message });
  }
};

// Get profile by ID
export async function getProfile(req, res) {
  try {
    const user = await findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update profile
export async function updateProfile(req, res) {
  try {
    const user = await findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password){
        user.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all users (admin only)
export async function getAllUsers(req, res) {
  try {
    const users = await find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
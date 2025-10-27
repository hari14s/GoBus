import User from '../models/User.js';
import Employee from '../models/Employee.js'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Register new passenger
export async function registerUser(req, res) {
  try {
    const { username, phone, email, password, user_role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits." });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long, contain at least one letter, one number, and one special character."
      });
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    let userType = user_role;

    if(userType === "Driver" || userType === "Conductor") userType = "Employee";

    const user = await User.create({ 
        username, 
        phone,
        email, 
        password,
        usertype: userType 
    });
    res.status(201).json({message: "User Registration successful",
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//Get details of Employee after regsitering
export async function DetailsUser(req, res){
  try{
    const { user_id, first_name, last_name, dob, phone, employee_type, license_no, gender} = req.body;
    const emp = await Employee.create ({
      user_id, first_name, last_name, dob, phone, employee_type, license_no, gender
    });
    res.status(201).json({message: "Employee Detils updated"});
  } catch(err){
    res.status(400).json({error: err.message});
  }
}

// Login for all users
export async function loginUser(req, res) {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            usertype: user.usertype,
            phone: user.phone,
            token
        });
    }catch(error){
    res.status(500).json({ message: error.message });
  }
};

// Get profile by ID
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update profile
export async function updateProfile(req, res) {
  try {
    const user = await User.findById(req.params.id);
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
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
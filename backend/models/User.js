import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { genSalt, hash} = bcrypt;

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  usertype: { 
    type: String, 
    enum: ['admin', 'employee', 'passenger'], 
    default: 'passenger',
},
  phone: { type: String },
}, 
{ timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
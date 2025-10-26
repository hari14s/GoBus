import mongoose from 'mongoose';

const employeeSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  first_name: { 
    type: String, 
    required: true,
},
  last_name: { 
    type: String, 
    required: true 
},
    dob: { type: Date },
    type: { 
        type: String, 
        enum: ["driver", "conductor"], 
        required: true },
    gender: { 
        type: String, 
        enum: ["male", "female", "other"] },
    license_number: { type: String },
    phone_no: { type: String },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
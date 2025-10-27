import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  userId: {
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
  phone_no: { type: String },
  EmployeeType: { 
      type: String, 
      enum: ["driver", "conductor"], 
      required: true },
  license_number: { type: String },
  gender: { type: String },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
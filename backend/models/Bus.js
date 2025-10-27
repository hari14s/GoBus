import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  bus_name: {
    type: String,
    required: true
  },
  numberPlate: { 
    type: String, 
    required: true, 
    unique: true 
},
  model: { 
    type: String, 
    required: true 
},
  capacity: { 
    type: Number, 
    required: true 
},
}, { timestamps: true });

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
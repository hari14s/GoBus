import mongoose from "mongoose";

const depotSchema = new mongoose.Schema({
  depot_name: {
    type: String,
    required: true,
    unique: true
  },
  location: String,
  capacity: Number, // optional: max buses it can hold
}, 
{ timestamps: true });

const Depot = mongoose.model('Depot', depotSchema);
export default Depot;
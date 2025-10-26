import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  start_point: { type: String, required: true },
  end_point: { type: String, required: true },
  distance: { type: Number, required: true },
  no_of_stops: { type: Number },
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);
export default Route;
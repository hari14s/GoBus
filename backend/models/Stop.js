import mongoose from "mongoose";

const stopSchema = new mongoose.Schema(
  {
    stop_name: { type: String, required: true },
    route_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
  },
  { timestamps: true }
);

const Stop = mongoose.model("Stop", stopSchema);
export default Stop;

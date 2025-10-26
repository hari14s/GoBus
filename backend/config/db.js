import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    console.log(process.env.MONGO_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch(err) {
        console.error(`❌ Error: ${err.message}`);
        console.error('Make sure MongoDB is installed and running locally');
        process.exit(1);
    }
};

export default connectDB;
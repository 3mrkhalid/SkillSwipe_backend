import mongoose from "mongoose";

const DBconn = async () => {
  try {
    // Wait for the connection to complete
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Optional: Exit the process if DB connection fails
  }
};

export default DBconn;
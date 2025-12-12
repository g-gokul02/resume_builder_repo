import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongodbURI) {
      throw new Error("❌ MONGODB_URI environment variable is missing");
    }

    // Remove trailing slash
    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    const finalURI = `${mongodbURI}/${projectName}`;

    // Clear old listeners (avoid duplicate logs)
    mongoose.connection.removeAllListeners();

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });

    // ⛔ No extra options – Mongoose v7 already handles everything internally
    await mongoose.connect(finalURI);

  } catch (error) {
    console.error("🚨 MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;




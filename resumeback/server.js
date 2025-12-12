import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoute.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// Database Connection
// --------------------
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Failed to connect DB:", err);
    process.exit(1);
  }
})();

// --------------------
// Middleware
// --------------------
app.use(express.json({ limit: "1mb" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// --------------------
// Routes
// --------------------
app.get("/", (req, res) => {
  res.send("Server is live...");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

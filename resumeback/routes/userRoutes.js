import express from "express";

import { 
  getUserById, 
  getUserResumes, 
  loginUser, 
  registerUser 
} from "../controllers/usercontroller.js";

import protect from "../middlewares/authmiddleware.js";


const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected route
userRouter.get("/data", protect, getUserById);
userRouter.get("/resumes",protect,getUserResumes);

export default userRouter;
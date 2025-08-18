import express from "express";
import {
  registerUser,
  loginUser,
  userCredits,
} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";
import { paymentStripe } from "../controllers/userController.js";
import { verifyStripe } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/payment-stripe", userAuth, paymentStripe);
userRouter.post("/verify-stripe", verifyStripe);

export default userRouter;

//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/login
//http://localhost:4000/api/user/credits
//http://localhost:4000/api/user/pay-stripe
//http://localhost:4000/api/user/verify-stripe

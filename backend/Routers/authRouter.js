import {
  login,
  register,
  updateUser,
  updatePassword,
} from "../controllers/authController.js";
import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});
// we can use app.use(limiter) in the server if want to use it globly
router.route("/register").post(limiter, register);
router.route("/login").post(limiter, login);

// router.route("/login").post(login);
// router.route("/register").post(register);

// router.route("/login").post(limiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updatePassword").patch(authenticateUser, updatePassword);



export default router;

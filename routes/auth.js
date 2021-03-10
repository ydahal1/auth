import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword
} from "../controllers/auth.js";

//Initialize and exporst express router
export const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);

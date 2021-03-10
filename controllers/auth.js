//Import mongoose user model
import { User } from "../models/Users.js";

export const register = async (req, res, next) => {
  // res.send("Register  route");
  //Destructuring from req.body
  const { firstName, lastName, email, password } = req.body;

  //Create a user with the modal
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });
    res.status(201).json({
      success: true,
      user
    });

    //If error occurs throw error
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

//Handle login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Please provide email or password" });
  }

  //Try catch
  try {
    const user = await User.findOne({ email }).select("+password");

    //if no email is found send
    if (!user) {
      res.status(404).json({ sucess: false, error: "Invalid credentials" });
    }
    //if email is found, check if pw matches. Match password is defined in userModel
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(404).json({ sucess: false, error: "Invalid Credentials" });
    }

    //If password matches send JWT
    res.status(200).json({
      sucess: true,
      token: "jadhajdhahd"
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error: error.message
    });
  }
};

export const forgotPassword = (req, res, next) => {
  res.send("Forgot password route");
};

export const resetPassword = (req, res, next) => {
  res.send("Reset Password");
};

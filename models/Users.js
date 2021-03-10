import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//User model
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name required"]
  },
  email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

//Middlere that runs pre-saving and post saving on DB
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  //Create salt with bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Compare password function
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);

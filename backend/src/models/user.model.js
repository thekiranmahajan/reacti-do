import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dyb7cgqfc/image/upload/v1745487507/profile-picture_lu1cgz.svg",
  },
});

const { Schema } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique:true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  fullName: {
    type: String,
    required: true,
    default: "New User",
  },
  phone: {
    type: String,
    required: false,   // ✅ optional at signup
    default: "",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  avatar: {
    type: String,
    required: false,
    default: "",
  },
  profileComplete: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });   // ✅ auto-manages createdAt & updatedAt

module.exports = { UserSchema };
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: [
      true,
      "The username you provided is already taken. Please provide another unique one.",
    ],
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: [true, "Account already exist with the given email."],
  },
  password: {
    type: String,
    required: [true, "Please fill your password."],
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  console.log("User", user);
  bcrypt
    .hash(user?.password, 10)
    .then((encryptedPassword) => {
      console.log("bcrypt password", encryptedPassword);
      user.password = encryptedPassword;
      next();
    })
    .catch((err) => {
      console.log("bcrypt error", err);
    });
});

module.exports = mongoose.model("User", userSchema);

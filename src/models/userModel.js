const mongoose = require("mongoose");
const { isEmailValid } = require("../validations/schemaValidations");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmailValid,
        message: "Invalid email format",
      },
    },
    phoneNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema, "users");
module.exports = User;

const Validator = require("validator");
const isEmailValid = (email) => {
  return Validator.isEmail(email);
};
module.exports = { isEmailValid };

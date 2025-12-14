const User = require("../models/userModel");
const { verifyOtpWithRedis } = require("../utils/otpUtils");
const { setCookie } = require("../utils/cookieSetterGetter");
const verifyOtpController = async (req, res) => {
  try {
    const { code, email } = req.body;
    const isValidOtp = await verifyOtpWithRedis(code, email);
    if (isValidOtp) {
      const userData = await User.findOne({ email: email });
      console.log(userData);
      req.userData = userData;
      setCookie(req, res);
      res
        .status(200)
        .json({ data: userData, message: " User Logged in succesfully" });
    } else {
      throw new Error(`otp is not valid `);
    }
  } catch (err) {
    res
      .status(401)
      .json({ data: [], message: `Unauthorized request ${err.message}` });
  }
};
module.exports = { verifyOtpController };

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { generateOtpWithEmail } = require("../utils/otpUtils");
const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const decryptUserId = jwt.verify(token, process.env.JWT_KEY);

    const userData = await User.findOne({ _id: decryptUserId.id });
    console.log(userData);
    if (userData) {
      req.userData = userData;
      next();
    } else {
      throw new Error(" something went wroong");
    }
  } catch (err) {
    res.status(401).json({ data: [], message: "Unauthorized request" });
  }
};

const nodeMailerSentOtpMiddleWare = async (req, res, next) => {
  try {
    const email = req.body.email;
    const confirmationResult = await generateOtpWithEmail(email);

    console.log(" confirmationResult  ", confirmationResult);
    req.confirmationResult = confirmationResult;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ data: [], message: `firebase error ${err.message} ` });
  }
};

module.exports = { authMiddleware, nodeMailerSentOtpMiddleWare };

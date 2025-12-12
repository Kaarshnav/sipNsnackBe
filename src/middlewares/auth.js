const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  try {
    console.log(" came into auth midd");
    const { token } = req.cookies;

    const decryptUserId = await jwt.verify(token, process.env.JWT_KEY);

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
module.exports = authMiddleware;

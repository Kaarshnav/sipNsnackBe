const jwt = require("jsonwebtoken");
const setCookie = (req, res) => {
  const userData = req.userData;
  const token = jwt.sign({ id: userData._id.toString() }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    expires: new Date(Date.now() + 9000000000),
    httpOnly: true, // to prevenyt xss
    sameSite: "strict",
    secure: true,
  });
};
module.exports = { setCookie };

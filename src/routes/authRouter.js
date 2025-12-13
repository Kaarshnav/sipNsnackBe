const express = require("express");
const authRouter = express();
const jwt = require("jsonwebtoken");
const { addNewUser, getExistingUser } = require("../service/userService");
const {
  validateNewUserData,
  validateExistingUserData,
} = require("../validations/apiDataValidation");
const {
  authMiddleware,
  nodeMailerSentOtpMiddleWare,
} = require("../middlewares/auth");
authRouter.post("/signup", async (req, res) => {
  try {
    const zodParsedData = validateNewUserData(req.body);
    const dbUpdatedZodParsedData = await addNewUser(zodParsedData);
    console.log(dbUpdatedZodParsedData.data);
    if (Object.keys(dbUpdatedZodParsedData.data).length > 0) {
      res.status(200).json({
        data: dbUpdatedZodParsedData.data,
        message: " User Succesfully added",
      });
    } else {
      throw new Error(dbUpdatedZodParsedData.message);
    }
  } catch (err) {
    res.status(401).json({
      data: [],
      message: err.message,
    });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const zodParsedData = validateExistingUserData(req.body);
    const dbUpdatedZodParsedData = await getExistingUser(zodParsedData);
    const userData = dbUpdatedZodParsedData.data;
    console.log(userData);
    if (Object.keys(userData).length > 0) {
      const token = await jwt.sign(
        { id: userData._id.toString() },
        process.env.JWT_KEY,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("token", token, {
        expires: new Date(Date.now() + 9000000000),
        httpOnly: true, // to prevenyt xss
        sameSite: "strict",
        secure: true,
      });

      res.status(200).json({
        data: userData,
        message: " User loggedin sucessfully ",
      });
    } else {
      throw new Error(dbUpdatedZodParsedData.message);
    }
  } catch (err) {
    res.status(401).json({
      data: [],
      message: err.message,
    });
  }
});
authRouter.post("/logout", authMiddleware, async (req, res) => {
  try {
    res.cookie("token", " ", {
      expires: new Date(Date.now()),
      httpOnly: true, // to prevenyt xss
      sameSite: "strict",
      secure: true,
    });
    res.status(200).json({ data: [], message: " user logged out suucesfully" });
  } catch (err) {
    res.status(401).json({
      data: [],
      message: err.message,
    });
  }
});
authRouter.post("/send-otp", nodeMailerSentOtpMiddleWare, async (req, res) => {
  try {
    res.status(200).json({
      data: req.confirmationResult,
      message: "Otp sent succesfully ",
    });
  } catch (error) {
    res.status(401).json({
      data: [],
      message: `user not vaildated ${err.message}
      `,
    });
  }
});
module.exports = authRouter;

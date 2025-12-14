const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const { validateUpdateUserData } = require("../validations/apiDataValidation");
const { updateExistingUser } = require("../service/userService");
const userRouter = express.Router();
userRouter.get("/profile", authMiddleware, (req, res) => {
  //since user is checked via authMiddleware and it's info is already there
  try {
    res
      .status(200)
      .json({ data: req.userData, message: "Data fetched succesfully" });
  } catch (error) {
    res.status(401).json({
      data: [],
      message: `Somethimg went wrong ${error.message}`,
    });
  }
});
userRouter.patch("/profile", authMiddleware, async (req, res) => {
  try {
    const dataToBeUpdated = req.body;
    const zodParsedData = validateUpdateUserData(dataToBeUpdated);
    const dataSynced = await updateExistingUser(
      zodParsedData,
      req.userData._id
    );
    res.status(200).json({
      data: dataSynced,
      message: "Data Updated Succesfully",
    });
  } catch (err) {
    res
      .status(401)
      .json({ data: [], message: `something went wrong ${err.message}` });
  }
});
module.exports = userRouter;

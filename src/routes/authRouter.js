const express = require("express");
const authRouter = express();
const { addNewUser } = require("../service/userService");
const { validateUserData } = require("../validations/apiDataValidation");
authRouter.post("/signup", async (req, res) => {
  try {
    const zodParsedData = validateUserData(req.body);
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
module.exports = authRouter;

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const addNewUser = async (data) => {
  try {
    const hashedpassword = await bcrypt.hash(data.password, 10);
    const currentUser = User({
      name: data?.name,
      email: data?.email,
      password: hashedpassword,
      phoneNo: data?.phoneNo,
      address: data?.address,
    });
    await currentUser.save();
    return { data: currentUser, message: " User added succesfully" };
  } catch (err) {
    return {
      data: [],
      message: `Some Error occured while saving user into db ${err.message}`,
    };
  }
};
module.exports = { addNewUser };

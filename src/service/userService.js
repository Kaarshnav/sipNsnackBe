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
const getExistingUser = async (data) => {
  try {
    const currentUser = await User.findOne({
      email: data?.email,
    });
    const isValidUser = await bcrypt.compare(
      data.password,
      currentUser.password
    );
    if (isValidUser) {
      return { data: currentUser, message: " User added succesfully" };
    } else {
      throw new Error("User Not found ");
    }
  } catch (err) {
    return {
      data: [],
      message: `Some Error occured while fetching user into db ${err.message}`,
    };
  }
};
const updateExistingUser = async (data, id) => {
  try {
    const dataSynced = await User.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true, // return updated doc
        runValidators: true,
      }
    );
    return dataSynced;
  } catch (error) {
    throw error;
  }
};

module.exports = { addNewUser, getExistingUser, updateExistingUser };

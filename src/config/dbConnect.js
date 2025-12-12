const mongoose = require("mongoose");
const connectDbFn = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(" Db connected succesfully .... ");
};
module.exports = connectDbFn;

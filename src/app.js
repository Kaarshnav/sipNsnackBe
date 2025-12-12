// importing part
const express = require("express");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
// making instances
const app = express();

// middlewares and config part like
// loading .env ,body parser from express and cors blah blah
app.use(express.json());
app.use(cookieParser());
//

app.use("/user", authRouter);
app.use("/", (req, res) => {
  res.send("aur londe , kya haal h ");
});
module.exports = app;

const dotenv = require("dotenv");
const app = require("./app");
const connectDbFn = require("./config/dbConnect");
dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDbFn();
  console.log(`Server is watching you at port ${PORT} xD .....`);
});

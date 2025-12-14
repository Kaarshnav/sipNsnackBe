const dotenv = require("dotenv");
const app = require("./app");
const connectDbFn = require("./config/dbConnect");
const { connectRedis } = require("./utils/redisStore");
dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDbFn();
  await connectRedis();
  console.log(`Server is watching you at port ${PORT} xD .....`);
});

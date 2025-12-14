const { createClient } = require("redis");
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
redis.on("error", (err) => console.error("Redis Error", err));
// (async () => {
//   await redis.connect();
//   console.log("Redis connected");
// })();

const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("Redis is connected .. ");
  }
};
// instead of IIFE exporting and then conecting in server
// , just for more readbality

// The above code connects to localhost on port 6379.
const setCustomValueRedis = async (key, value, ttlSeconds) => {
  try {
    //ttl is time till live , automatically delete after that time
    const data = JSON.stringify(value);
    if (ttlSeconds) {
      await redis.set(key, data, { EX: ttlSeconds });
    } else {
      await redis.set(key, data);
    }
  } catch (err) {
    console.error("Redis SET error:", err);
    throw err;
  }
};
const getCustomValueRedis = async (key) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};
const deleteKey = async (key) => {
  await redis.del(key);
};

module.exports = {
  setCustomValueRedis,
  getCustomValueRedis,
  deleteKey,
  redis,
  connectRedis,
};

const z = require("zod");

const UserDataValidation = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  address: z.string().optional(),
  phoneNo: z.string(),
  // optional => it's okay if we don't send
  // nullable => value can be undefined , but key should be present
});
const validateUserData = (data) => {
  console.log(UserDataValidation.parse(data), "--- res --");
  return UserDataValidation.parse(data);
};
module.exports = {
  validateUserData,
};

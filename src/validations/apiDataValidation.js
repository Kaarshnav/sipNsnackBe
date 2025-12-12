const z = require("zod");

const NewUserDataValidation = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  address: z.string().optional(),
  phoneNo: z.string(),
  // optional => it's okay if we don't send
  // nullable => value can be undefined , but key should be present
});
const ExistingUserDataValidation = z.object({
  email: z.email(),
  password: z.string(),
});
const validateNewUserData = (data) => {
  return NewUserDataValidation.parse(data);
};
const validateExistingUserData = (data) => {
  return ExistingUserDataValidation.parse(data);
};
module.exports = {
  validateNewUserData,
  validateExistingUserData,
};

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
const updateUserDataValidation = z
  .object({
    // making email as immutable ,
    // while rest all can be changed and all will be optional
    name: z.string().optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    phoneNo: z.string().optional(),
  })
  .strict();
// .strict , to throw error if extra field comes ,
// else it will allow email to pass
// while doesn't upadte anyway
const validateNewUserData = (data) => {
  return NewUserDataValidation.parse(data);
};
const validateExistingUserData = (data) => {
  return ExistingUserDataValidation.parse(data);
};
const validateUpdateUserData = (data) => {
  return updateUserDataValidation.parse(data);
};
module.exports = {
  validateNewUserData,
  validateExistingUserData,
  validateUpdateUserData,
};

let { body } = require("express-validator");

//* ===========================================================

let createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Email is invalid"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

//* ===========================================================

let createAdminValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Email is invalid"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role").equals("admin").withMessage("Role must be admin"),
];

//* ===========================================================

let loginValidation = [
  body("email").isEmail().withMessage("Email is invalid"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

//* ===========================================================

module.exports = {
  createUserValidation,
  createAdminValidation,
  loginValidation,
};

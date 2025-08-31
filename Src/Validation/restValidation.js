let { body, param } = require("express-validator");

//* ========================================================

let createValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("content").notEmpty().withMessage("Content is Required"),

  body("createdBy")
    .notEmpty()
    .withMessage("CreatedBy is Required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 characters long"),
];

//* ========================================================

let updateValidation = [
  param("id").isMongoId().withMessage("invalid ID Format"),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title is Required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("content").optional().notEmpty().withMessage("Content is Required"),

  body("createdBy")
    .optional()
    .notEmpty()
    .withMessage("createdByis Required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 characters long"),

  //? ==============================================
  //! This Fx get data from Postman
  (req, res, next) => {
    if (!req.body.title && !req.body.content && !req.body.createdBy) {
      return res.status(400).json({ err: "At least One Field Required " });
    }

    next();
  },

  //? ==============================================
];

//* ========================================================

let removeValidation = [
  param("id").isMongoId().withMessage("invalid ID Format"),
];

//* ========================================================

let findOneValidation = [
  param("id").isMongoId().withMessage("invalid ID Format"),
];

//* ========================================================

module.exports = {
  createValidation,
  updateValidation,
  removeValidation,
  findOneValidation,
};

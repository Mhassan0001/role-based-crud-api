let { body, param, query } = require("express-validator");

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

let queryValidation = [
  //! Pagination-Validations

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positve Integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 - 100"),

  //todo==================================

  //! Sorting-Validations

  query("sortField")
    .optional()
    .isIn(["title", "content", "createdBy"])
    .withMessage("Sort field must be title, createdBy, or content"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortOrder must be asc or dec"),

  //todo==================================

  //! Filtering-Validations

  query("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("title must be 3 Character long"),

  query("content")
    .optional()
    .isLength({ min: 3 })
    .withMessage("content must be 3 Character long"),

  query("createdBy")
    .optional()
    .isLength({ min: 3 })
    .withMessage("createdBy must be 3 Character lon long"),

  //todo==================================

  //! Searching-Validations

  query("searchTitle")
    .optional()
    .isString()
    .withMessage("searchTitle must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("searchTitle must be between 3 and 50 Character long")
    .trim(),

  query("searchContent")
    .optional()
    .isString()
    .withMessage("searchContent must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("serachContent must be between 3 and 50 Character long")
    .trim(),
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
    .withMessage("createdsByis Required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 characters long"),

  //? ==============================================
  //! This Fx get data from Postman
  (req, res, next) => {
    if (
      !req.body.title &&
      !req.body.content &&
      !req.body.createdBy &&
      !req.file
    ) {
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
  queryValidation,
};

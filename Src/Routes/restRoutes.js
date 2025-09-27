let express = require("express");
let router = express.Router();
// *============================================================

//todo  Middleware Require

let { authMiddleware } = require("../Middlewares/authMiddleware");

// *============================================================

let upload = require("../Middlewares/uploadMiddleware");

// *============================================================

//todo  Controller's Require

let {
  check,
  update,
  findOne,
  remove,
  read,
  create,
} = require("../Controllers/restControllers");

// *============================================================

//todo  Rest-Validation Require

let {
  createValidation,
  updateValidation,
  removeValidation,
  findOneValidation,
  queryValidation,
} = require("../Validation/restValidation");

// *============================================================

//todo  ValidateRequest-Middleware Require

let { validateRequest } = require("../Middlewares/validateRequest");

// *============================================================

router.route("/check").get(check);

// ?============================================================

router
  .route("/create")
  .post(
    authMiddleware,
    upload.single("file"),
    createValidation,
    validateRequest,
    create
  );

// ?============================================================

router
  .route("/read")
  .get(queryValidation, validateRequest, authMiddleware, read);

// ?============================================================

router.route("/update/:id").put(
  authMiddleware,
  upload.single("file"),
  updateValidation,
  validateRequest,
  update
);

// ?============================================================

router
  .route("/remove/:id")
  .delete(removeValidation, validateRequest, authMiddleware, remove);

// todo============================================================

router
  .route("/find/:id")
  .get(findOneValidation, validateRequest, authMiddleware, findOne);

// *============================================================

module.exports = router;

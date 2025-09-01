let express = require("express");
let router = express.Router();
// *============================================================

//todo  Middleware Require

let {
  authMiddleware,
  roleBaseMiddleware,
} = require("../Middlewares/authMiddleware");

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
} = require("../Validation/restValidation");

// *============================================================

//todo  ValidateRequest-Middleware Require

let { validateRequest } = require("../Middlewares/validateRequest");

// *============================================================

router.route("/check").get(check);

// ?============================================================

router
  .route("/create")
  .post(createValidation, validateRequest, authMiddleware, create);

// ?============================================================

router.route("/read").get(authMiddleware, read);

// ?============================================================

router
  .route("/update/:id")
  .put(updateValidation, validateRequest, authMiddleware, update);

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

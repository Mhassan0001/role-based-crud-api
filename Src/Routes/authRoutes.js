let express = require("express");
let router = express.Router();
// ?============================================================
//!  Controller's
let {
  createUser,
  login,
  createAdmin,
} = require("../Controllers/authController");

// ?============================================================
//todo  Middlewares
let {
  authMiddleware,
  roleBaseMiddleware,
} = require("../Middlewares/authMiddleware");
// ?============================================================
//todo  Validation's

let {
  createUserValidation,
  createAdminValidation,
  loginValidation,
} = require("../Validation/authValidation");

// *============================================================

//todo  Validation's-Middleware

let { validateRequest } = require("../Middlewares/validateRequest");

// *============================================================

router.route("/create").post(createUserValidation, validateRequest, createUser);

// *============================================================
router
  .route("/createAdmin")
  .post(
    createAdminValidation,
    validateRequest,
    authMiddleware,
    roleBaseMiddleware("admin"),
    createAdmin
  );
// *============================================================
router.route("/login").post(loginValidation, validateRequest, login);

// *============================================================

module.exports = router;

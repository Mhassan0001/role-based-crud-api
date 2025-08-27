let express = require("express");
let router = express.Router();
let {
  createUser,
  login,
  createAdmin,
} = require("../Controllers/authController");
let {
  authMiddleware,
  roleBaseMiddleware,
} = require("../Middlewares/authMiddleware");

// *============================================================

router.route("/create").post(createUser);
router
  .route("/createAdmin")
  .post(authMiddleware, roleBaseMiddleware("admin"), createAdmin);
router.route("/login").post(login);

// *============================================================

module.exports = router;

let express = require("express");
let router = express.Router();

let { authMiddleware,roleBaseMiddleware } = require("../Middlewares/authMiddleware");

let {
  check,
  update,
  findOne,
  remove,
  read,
  create,
} = require("../Controllers/restControllers");

// *============================================================

router.route("/check").get(check);
router.route("/create").post(authMiddleware, create);
router.route("/read").get(authMiddleware, read);
router.route("/update/:id").put(authMiddleware, update);
router.route("/remove/:id").delete(authMiddleware, remove);
router.route("/find/:id").get(authMiddleware, findOne);

// *============================================================

module.exports = router;

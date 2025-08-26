let jwt = require("jsonwebtoken");
require("dotenv").config();

// *============================================================

let authMiddleware = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(500).json({ msg: "You are not login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

let roleBaseMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ msg: "Acess Denied You are not Authorized..." });
    }

    next();
  };
};

// *============================================================

module.exports = { authMiddleware , roleBaseMiddleware };

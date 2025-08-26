let collection = require("../Model/authModel");
let bcrypt = require("bcrypt");
require("dotenv").config();
let jwt = require("jsonwebtoken");

let createUser = (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let data = await collection.create({
          name,
          email,
          password: hash,
          role: "user",
        });

        let token = jwt.sign(
          {
            _id: data.id,
            email: data.email,
            role: data.role,
          },
          process.env.JWT_KEY
        );
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json(data);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

let login = async (req, res) => {
  try {
    let user = await collection.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ msg: "user Not Found" });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }

      if (!result) {
        return res.status(401).json({ msg: "password Invalid" });
      }

      let token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_KEY
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ msg: "login successfully", token });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

module.exports = { createUser, login };

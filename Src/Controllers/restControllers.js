let collection = require("../Model/restModel");

// *============================================================

let check = (req, res) => {
  res.status(200).json({ msg: "Controller Working" });
};

// ?============================================================

let create = async (req, res) => {
  try {
    let userId = req.user.userId;
    let data = await collection.create({ ...req.body, userId });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

let read = async (req, res) => {
  try {
    //Todo - Working On Pagination-Branch
    let userId = req.user.userId;
    if (req.user.role === "admin") {
      let data = await collection.find();
      res.status(200).json(data);
    } else {
      let data = await collection.find({ userId });
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ?============================================================

let update = async (req, res) => {
  try {
    let userId = req.user.userId;
    let _id = req.params.id;
    let role = req.user.role;
    let filter = role === "admin" ? { _id } : { _id, userId };
    let data = await collection.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

let remove = async (req, res) => {
  try {
    let userId = req.user.userId;
    let _id = req.params.id;
    let role = req.user.role;
    let filter = role === "admin" ? { _id } : { _id, userId };
    let data = await collection.findOneAndDelete(filter);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ?============================================================

let findOne = async (req, res) => {
  try {
    let userId = req.user.userId;
    let _id = req.params.id;
    let role = req.user.role;
    let filter = role === "admin" ? { _id } : { _id, userId };
    let data = await collection.findOne(filter);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

module.exports = { check, create, read, update, remove, findOne };

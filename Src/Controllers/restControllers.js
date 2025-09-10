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
    //Todo - Creating & Working On Sorting-feature Branch
    let userId = req.user.userId;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    //  ?============================================
    let data;
    let totalItems;
    let totalPages;
    //  ?============================================
    if (req.user.role === "admin") {
      totalItems = await collection.countDocuments();
      totalPages = Math.ceil(totalItems / limit);
      data = await collection.find().skip(skip).limit(limit);
      res.status(200).json({ data, page, limit, totalItems, totalPages });
    } else {
      totalItems = await collection.countDocuments({ userId });
      totalPages = Math.ceil(totalItems / limit);
      data = await collection.find({ userId }).skip(skip).limit(limit);
      res.status(200).json({ data, page, limit, totalItems, totalPages });
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

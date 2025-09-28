let collection = require("../Model/restModel");
let fs = require("fs");
let path = require("path");
// *============================================================

let check = (req, res) => {
  res.status(200).json({ msg: "Controller Working" });
};

// *============================================================

let create = async (req, res) => {
  try {
    let filename = req.file ? req.file.filename : null;
    let userId = req.user.userId;
    let data = await collection.create({
      ...req.body,
      userId,
      files: filename,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

let read = async (req, res) => {
  try {
    let userId = req.user.userId;
    let data;
    //  ?============================================
    //! Pagination-Query's
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    let totalItems;
    let totalPages;
    //  ?============================================
    //! Sorting-Query's
    let sortField = req.query.sortField || "createdBy";
    let sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    //  ?============================================
    //! Filtering-Query
    let filter = {};
    if (req.query.createdBy) filter.createdBy = req.query.createdBy;
    //  ?============================================
    //! Searching-Query's & Filering-Query's

    if (req.query.searchTitle) {
      filter.title = { $regex: req.query.searchTitle, $options: "i" };
    } else if (req.query.title) {
      filter.title = req.query.title;
    }

    if (req.query.searchContent) {
      filter.content = { $regex: req.query.searchContent, $options: "i" };
    } else if (req.query.content) {
      filter.content = req.query.content;
    }

    //  ?============================================

    if (req.user.role === "admin") {
      totalItems = await collection.countDocuments(filter);
      totalPages = Math.ceil(totalItems / limit);
      data = await collection
        .find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit);
      res.status(200).json({ data, page, limit, totalItems, totalPages });
    } else {
      filter.userId = userId;
      totalItems = await collection.countDocuments(filter);
      totalPages = Math.ceil(totalItems / limit);
      data = await collection
        .find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit);
      res.status(200).json({ data, page, limit, totalItems, totalPages });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *============================================================

let update = async (req, res) => {
  try {
    let userId = req.user.userId;
    let _id = req.params.id;
    let role = req.user.role;

    let filter = role === "admin" ? { _id } : { _id, userId };
    let oldRecord = await collection.findOne(filter);

    if (req.file) {
      if (oldRecord && oldRecord.files) {
        const oldRecordPath = path.join(
          __dirname,
          "../upload",
          oldRecord.files
        );
        if (fs.existsSync(oldRecordPath)) {
          try {
            await fs.promises.unlink(oldRecordPath);
          } catch (error) {
            console.log("file Delete Error", error);
          }
        }
      }
    }

    let filename = req.file ? req.file.filename : oldRecord.files;

    let data = await collection.findOneAndUpdate(
      filter,
      { ...req.body, files: filename },
      {
        new: true,
        runValidators: true,
      }
    );
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
    let oldRecord = await collection.findOne(filter);

    if (oldRecord && oldRecord.files) {
      const oldRecordPath = path.join(
        __dirname,
        "../upload",
        path.basename(oldRecord.files)
      );
      if (fs.existsSync(oldRecordPath)) {
        try {
          await fs.promises.unlink(oldRecordPath);
        } catch (error) {
          console.log("File not Delete", error);
        }
      }
    }

    let data = await collection.findOneAndDelete(filter);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// *============================================================

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

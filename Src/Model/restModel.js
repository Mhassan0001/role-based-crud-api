let mongoose = require("mongoose");

let schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AuthModelCollection",
    },
  },
  { timestamps: true }
);

let collection = mongoose.model("RestModelCollection", schema);

module.exports = collection;

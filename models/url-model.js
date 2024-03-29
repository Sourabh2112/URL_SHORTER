const mongoose = require("mongoose");

const urlschema = new mongoose.Schema(
  {
    shorturl: {
      type: String,
      require: true,
      unique: true,
    },
    redirecturl: {
      type: String,
      require: true,
    },
    visithistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamp: true }
);

const url = mongoose.model("url-model", urlschema);

module.exports = url;

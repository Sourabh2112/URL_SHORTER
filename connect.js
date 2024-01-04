const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectdatabase(url) {
  mongoose.connect(url);
}

module.exports = { connectdatabase };

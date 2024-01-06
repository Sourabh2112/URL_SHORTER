const express = require("express");
const { connectdatabase } = require("./connect");
const urlroute = require("./routes/url-route");
const staticroute = require("./routes/staticroute");
const url = require("./models/url-model");
const path = require("path");
const app = express();
const port = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectdatabase(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1"
).then(() => console.log("mongoose connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", staticroute);
app.use("/url", urlroute);
app.get("/:sortid", async (req, res) => {
  let sortid = req.params.sortid;
  // console.log(sortid);
  let entry = await url.findOneAndUpdate(
    {
      sortid,
    },
    {
      $push: {
        visithistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirecturl);
});

app.listen(port, () => console.log("server connected"));

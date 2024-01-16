const shortid = require("shortid");
const url = require("../models/url-model");
// const { shortid } = require("shortid");

async function shorturlgenerator(req, res) {
  const body = req.body;
  if (!body.url) res.status(400).json({ err: "invalid url" });
  const sortid = shortid();
  await url.create({
    shorturl: sortid,
    redirecturl: body.url,
    createdBy: req.user._id,
    visithistory: [],
  });
  const allurls = await url.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
  // return res.json({ id: sortid, originalurl: body.url });
}

async function analytic(req, res) {
  let shorturl = req.params.sortid;
  let data = await url.findOne({ shorturl });
  if (data) {
    return res.json({
      Number_of_time_visited: data.visithistory.length,
      visit_history: data.visithistory,
    });
  } else {
    res.send("INVALID URL!!");
  }
}

async function geturl(req, res) {
  let data = await url.find({});
  if (data) {
    res.send(data);
  } else {
    res.send("no url found");
  }
}

async function deleteurl(req, res) {
  let shorturl = req.query.ShortID;
  console.log(shorturl);
  let data = await url.findOneAndDelete({ shorturl });
  if (data) {
    console.log("URL deleted sucessfully");
  } else {
    console.log("INVALID URL!!!");
  }
  const allurls = await url.find({});
  return res.render("home", {
    urls: allurls,
  });
}
module.exports = { shorturlgenerator, analytic, geturl, deleteurl };

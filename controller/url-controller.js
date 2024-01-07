const shortid = require("shortid");
const url = require("../models/url-model");
// const { shortid } = require("shortid");

async function shorturlgenerator(req, res) {
  // console.log("hiii....");
  const body = req.body;
  if (!body.url) res.status(400).json({ err: "invalid url" });
  const sortid = shortid();
  // console.log(body.url);
  await url.create({
    shorturl: sortid,
    redirecturl: body.url,
    visithistory: [],
  });
  return res.render("home", {
    id: sortid,
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
  }else{
    res.send("INVALID URL!!")
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
  let shorturl = req.params.sortid;
  let data = await url.findOneAndDelete({ shorturl });
  if (data) {
    res.send("URL deleted sucessfully");
  } else {
    res.send("INVALID URL!!!");
  }
}
module.exports = { shorturlgenerator, analytic, geturl, deleteurl };

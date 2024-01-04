const shortid = require("shortid");
const url = require("../models/url-model");
// const { shortid } = require("shortid");

async function shorturlgenerator(req, res) {
  // console.log("hiii....");
  const body = req.body;
  if (!body.url) res.status(400).json({ err: "invalid url" });
  const sortid = shortid();
  // console.log(sortid);
  await url.create({
    shorturl: sortid,
    redirecturl: body.url,
    visithistory: [],
  });
  return res.json({ id: sortid, originalurl: body.url });
}

async function analytic(req, res) {
  let sortid = req.params.sortid;
  let data = await url.findOne({ sortid });
  if (data) {
    return res.json({
      Number_of_time_visited: data.visithistory.length,
      visit_history: data.visithistory,
    });
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
module.exports = { shorturlgenerator, analytic, geturl };

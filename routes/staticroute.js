const express = require("express");
const url = require("../models/url-model");

const router = express.Router();

router.get("/",async (req,res)=>{
    const allurls = await url.find({});
    return res.render("home",{
        urls : allurls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
  });

module.exports = router;
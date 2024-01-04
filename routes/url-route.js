const express = require("express");
const {
  shorturlgenerator,
  analytic,
  geturl,
} = require("../controller/url-controller");

const router = express.Router();
// console.log("hii....");
router.post("/", shorturlgenerator);
router.get("/analytic/:sortid", analytic);
router.get("/geturl", geturl);

module.exports = router;

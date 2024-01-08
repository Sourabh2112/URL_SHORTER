const express = require("express");
const {
  shorturlgenerator,
  analytic,
  geturl,
  deleteurl,
} = require("../controller/url-controller");

const router = express.Router();
// console.log("hii....");
router.post("/", shorturlgenerator);
router.get("/analytic/:sortid", analytic);
router.get("/geturl", geturl);
router.get("/delete", deleteurl);

module.exports = router;

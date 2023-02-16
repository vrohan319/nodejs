const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;

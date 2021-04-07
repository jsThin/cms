const express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
  res.render("admin/main/index.html")
});

router.get("/welcome", (req, res) => {
  res.send("欢迎来到后台管理中心")
})

module.exports = router;

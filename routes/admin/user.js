const express = require('express');
const tools = require("../../model/tools.js")
let router = express.Router();

router.get('/', function(req, res) {
  res.send('用户列表');
});

router.get("/addUser", (req, res) => {
  res.send("新增用户页面");
})

let cpUpload = tools.multer().fields([{ name: 'pic1', maxCount: 1 }, { name: 'pic2', maxCount: 1 }])
router.post("/addUser", cpUpload, (req, res) => {
  res.send({
    body: req.body,
    files: req.files
  });
})

module.exports = router;

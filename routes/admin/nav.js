const express = require('express');
const tools = require("../../model/tools.js")
const NavModel = require("../../model/navModel")
let router = express.Router();

router.get('/', async function(req, res) {
  let docs = await NavModel.find({})
  res.send(docs);
});

router.get("/add", (req, res) => {
  let result1 = new NavModel({
    title: "jsthin",
    url: "www.baidu.com"
  })
  result.save(err => {
    if(err) {
      console.log(err)
      return
    }
    console.log("新增导航成功")
  })
  res.send("新增导航页面");
})

router.post("/doAdd", tools.multer().single("pic"), (req, res) => {
  res.send({
    body: req.body,
    file: req.file
  });
})

router.get("/edit", (req, res) => {
  res.send("修改导航");
})

module.exports = router;
const express = require('express');
let router = express.Router();
const BannerModel = require("../../model/bannerModel")
const NavModel = require("../../model/navModel");
const ManagerModel = require("../../model/managerModel");

const appModel = { BannerModel, NavModel, ManagerModel };

router.get('/', function(req, res) {
  res.render("admin/main/index.html")
});

router.get("/welcome", (req, res) => {
  res.send("欢迎来到后台管理中心")
})

router.get('/changeStatus', async function(req, res) {
  let id = req.query.id;
  let model = req.query.model;
  let field = req.query.field;

  let params;
  let result = await appModel[model].find({ "_id": id});
  if(result.length > 0) {
    let tempField = result[0][field];
    tempField === 1 ? params = {[field]: 0} : params = {[field]: 1}
    await appModel[model].updateOne({_id: id}, params);
    res.send({
      success: true,
      message: "更新成功"
    })
  } else {
    res.send({
      success: false,
      message: "更新失败"
    })
  }
});

router.get('/changeNum', async function(req, res) {
  let id = req.query.id;
  let model = req.query.model;
  let field = req.query.field;
  let num = req.query.num;

  let params;
  let result = await appModel[model].find({ "_id": id});
  if(result.length > 0) {
    params = { [field]: num }
    await appModel[model].updateOne({_id: id}, params);
    res.send({
      success: true,
      message: "更新成功"
    })
  } else {
    res.send({
      success: false,
      message: "更新失败"
    })
  }
});

module.exports = router;

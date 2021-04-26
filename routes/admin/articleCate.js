const express = require("express");
const { getUnix } = require("../../model/tools");
const ArticleCateModel = require("../../model/articleCateModel");
const mongoose = require("mongoose");
let router = express.Router();

router.get("/", async (req, res) => {
  let result = await ArticleCateModel.aggregate([
    {
      $lookup: {
        from: "article_cate",
        localField: "_id",
        foreignField: "pid",
        as: "items"
      }
    },
    {
      $match: {
        pid: "0"
      }
    }
  ])
  res.render("admin/articleCate/index.html", {
    list: result
  })
})

router.get("/add", async (req, res) => {
  // 获取顶级分类
  let topCateList = await ArticleCateModel.find({ pid: "0" })
  res.render("admin/articleCate/add.html", {
    cateList: topCateList
  })
})

router.post("/doAdd", async (req, res) => {
  if(req.body.pid !== "0") {
    req.body.pid = mongoose.Types.ObjectId(req.body.pid);
  }
  req.body.add_time = getUnix();
  var result = new ArticleCateModel(req.body)
  await result.save();
  res.redirect(`/${req.app.locals.adminPath}/articleCate`)
})

router.get("/edit", async (req, res) => {
  let id = req.query.id;
  let list = await ArticleCateModel.find({_id: id})
  
  // 获取顶级分类
  let topCateList = await ArticleCateModel.find({ pid: "0" })
  res.render("admin/articleCate/edit.html", {
    cateList: topCateList,
    list: list[0]
  })
})

router.post("/doEdit", async (req, res) => {
  if(req.body.pid !== "0") {
    req.body.pid = mongoose.Types.ObjectId(req.body.pid);
  }
  await ArticleCateModel.updateOne({_id: req.body.id}, req.body)
  res.redirect(`/${req.app.locals.adminPath}/articleCate`)
})

router.get("/delete", async (req, res) => {
  let id = req.query.id;
  // 查询是否有pid是当前分类的id的分类，有则不删除
  let subResult = ArticleCateModel.find({pid: mongoose.Types.ObjectId(id)})
  if (subResult.length > 0) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/articleCate`,
      "message": "当前分类没法删除，请删除下面的子分类后重试"
    })
  } else {
    await ArticleCateModel.deleteOne({_id: id})
    res.render("admin/public/success.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/articleCate`,
      "message": "删除成功"
    })
  }
})

module.exports = router;
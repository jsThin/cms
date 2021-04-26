const express = require("express");
const ArticleModel = require("../../model/articleModel");
const ArticleCateModel = require("../../model/articleCateModel");
const tools = require("../../model/tools.js")
let router = express.Router();

router.get("/", async (req, res) => {
  let result = await ArticleModel.find({})
  res.render("admin/article/index.html", {
    list: result
  })
})

router.get("/add", async (req, res) => {
  // 获取顶级分类
  let cateList = await ArticleCateModel.aggregate([
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
  res.render("admin/article/add.html", {
    cateList: cateList
  })
})

router.post("/doAdd", tools.multer().single('article_img'), async (req, res) => {
  let article_img = req.file ? req.file.path.substr(7) : ""
  let result = new ArticleModel(Object.assign(req.body, { article_img: article_img }))
  await result.save()
  res.redirect(`/${req.app.locals.adminPath}/article`)
})

router.get("/edit", async (req, res) => {
  // 获取顶级分类
  let cateList = await ArticleCateModel.aggregate([
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
  let id = req.query.id;
  let result = await ArticleModel.find({_id: id})
  res.render("admin/article/edit.html", {
    cateList: cateList,
    list: result[0]
  })
})

router.post("/doEdit", tools.multer().single('article_img'), async (req, res) => {
  try {
    if(req.file) {
      let article_img = req.file ? req.file.path.substr(7) : ""
      await ArticleModel.updateOne({ _id: req.body.id}, Object.assign(req.body, { article_img: article_img }))
    } else {
      await ArticleModel.updateOne({ _id: req.body.id}, req.body)
    }
    res.redirect(`/${req.app.locals.adminPath}/article`);
  } catch (error) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/article/edit?id=${req.body.id}`,
      "message": "修改数据失败"
    })
  }
})

router.get("/delete", async (req, res) => {
  let id = req.query.id
  await ArticleModel.deleteOne({_id: id})
  res.render("admin/public/success.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/article`,
      "message": "删除内容成功"
  })
})

router.post("/uploadImg", tools.multer().single('file'), async (req, res) => {
  let uploadImg = req.file ? req.file.path.substr(7) : "";
  res.send({
    link: "/" + uploadImg
  })
})

module.exports = router;
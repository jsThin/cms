const express = require('express');
const tools = require("../../model/tools.js")
const BannerModel = require("../../model/bannerModel")
let router = express.Router();

router.get('/', async function(req, res) {
  let result = await BannerModel.find({})
  res.render("admin/banner/index.html", {
    list: result
  })
});

router.get("/add", (req, res) => {
  res.render("admin/banner/add.html")
})

router.post("/doAdd", tools.multer().single('banner_img'), async (req, res) => {
  try {
    let banner_img = req.file ? req.file.path.substr(7) : "";
    let banner = new BannerModel(Object.assign(req.body, { "banner_img": banner_img }));
    await banner.save()
    res.redirect(`/${req.app.locals.adminPath}/banner`)
  } catch (err) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/banner/add`,
      "message": "增加数据失败"
    })
  }
})

router.get("/edit", async (req, res) => {
  let id = req.query.id;
  let result = await BannerModel.find({_id: id});
  res.render("admin/banner/edit.html", {
    list: result[0]
  });
})

router.post("/doEdit", tools.multer().single('banner_img'), async (req, res) => {
  try {
    if (req.file) {
      let banner_img = req.file ? req.file.path.substr(7) : "";
      await BannerModel.updateOne({_id: req.body.id}, Object.assign(req.body, { "banner_img": banner_img }))
    } else {
      await BannerModel.updateOne({_id: req.body.id}, req.body)
    }
    res.redirect(`/${req.app.locals.adminPath}/banner`)
  } catch (error) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/banner/edit?id=` + req.body.id,
      "message": "修改数据失败"
    })
  }
})

router.get("/delete", async (req, res) => {
  let id = req.query.id;
  await BannerModel.deleteOne({_id: id});
  res.redirect(`/${req.app.locals.adminPath}/banner`)
})

module.exports = router;
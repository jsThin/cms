const express = require('express');
const tools = require("../../model/tools.js")
const NavModel = require("../../model/navModel")
let router = express.Router();

router.get('/', async function(req, res) {
  let result = await NavModel.find({})
  res.render("admin/nav/index.html", {
    list: result
  })
});

router.get("/add", (req, res) => {
  res.render("admin/nav/add.html")
})

router.post("/doAdd", async (req, res) => {
  try {
    let nav = new NavModel(req.body);
    await nav.save()
    res.redirect(`/${req.app.locals.adminPath}/nav`)
  } catch (err) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/nav/add`,
      "message": "增加数据失败"
    })
  }
})

router.get("/edit", async (req, res) => {
  let id = req.query.id;
  let result = await NavModel.find({_id: id});
  res.render("admin/nav/edit.html", {
    list: result[0]
  });
})

router.post("/doEdit", async (req, res) => {
  try {
    await NavModel.updateOne({_id: req.body.id}, req.body)
    res.redirect(`/${req.app.locals.adminPath}/nav`)
  } catch (error) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/nav/edit?id=` + req.body.id,
      "message": "修改数据失败"
    })
  }
})

router.get("/delete", async (req, res) => {
  let id = req.query.id;
  await NavModel.deleteOne({_id: id});
  res.redirect(`/${req.app.locals.adminPath}/nav`)
})

module.exports = router;
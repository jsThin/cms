const express = require("express");
const SettingModel = require("../../model/settingModel");
const tools = require("../../model/tools.js");
let router = express.Router();

router.get("/", async (req, res) => {
  let result = await SettingModel.find({});
  res.render("admin/setting/index.html", {
    list: result[0]
  })
})

let cpUpload = tools.multer().fields([{ name: 'site_logo', maxCount: 1 }, { name: 'no_picture', maxCount: 1 }])
router.post("/doEdit", cpUpload, async (req, res) => {
  try {
    let json = {}
    if(req.files.site_logo) {
      let site_logo = req.files.site_logo[0].path.substr(7);
      json = Object.assign(json, { site_logo: site_logo})
    }
    if(req.files.no_picture) {
      let no_picture = req.files.no_picture[0].path.substr(7);
      json = Object.assign(json, { no_picture: no_picture})
    }
    await SettingModel.updateMany({}, Object.assign(json, req.body));
    res.render("admin/public/success.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/setting`,
      "message": "修改数据成功"
    })
  } catch (error) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/setting`,
      "message": "修改数据失败"
    })
  }
})

module.exports = router;
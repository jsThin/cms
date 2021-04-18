const express = require('express');
const ManagerModel = require("../../model/managerModel")
let router = express.Router();
const { md5, getUnix } = require("../../model/tools")

router.get('/', async function(req, res) {
  let result = await ManagerModel.find({})
  res.render("admin/manager/index.html", {
    list: result
  })
});

router.get("/add", (req, res) => {
  res.render("admin/manager/add.html")
})

router.post("/doAdd", async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let rpassword = req.body.rpassword
  let email = req.body.email
  let mobile = req.body.mobile
  var status = req.body.status;

  // 校验数据合法性
  if(username === "") {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/manager/add`,
      "message": "用户名不能为空"
    })
    return;
  }
  if(password.length < 6) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/manager/add`,
      "message": "密码不能少于6位"
    })
    return;
  }
  if(password !== rpassword) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/manager/add`,
      "message": "密码和确认密码不一致"
    })
    return;
  }

  // 校验用户是否已存在
  let result = await ManagerModel.find({username: username})
  if(result.length > 0) {
    res.render("admin/public/error.html", {
      "redirectUrl": `/${req.app.locals.adminPath}/manager/add`,
      "message": "该用户名已被注册"
    })
    return;
  }
  
  let user = new ManagerModel({
    username,
    password: md5(password),
    email,
    mobile,
    status,
    addtime: getUnix()
  });
  await user.save();
  res.redirect(`/${req.app.locals.adminPath}/manager`);
})

router.get("/edit", async (req, res) => {
  let id = req.query.id
  let result = await ManagerModel.find({"_id": id})
  if(result.length > 0) {
    res.render("admin/manager/edit.html", {
      manger: result[0]
    })
  } else {
    res.redirect(`/${req.app.locals.adminPath}/manager`);
  }
})

router.post("/doEdit", async (req, res) => {
  var id = req.body.id; 
  let username = req.body.username
  let password = req.body.password
  let rpassword = req.body.rpassword
  let email = req.body.email
  let mobile = req.body.mobile
  var status = req.body.status;
  if(password.length > 0) {
    if(password.length < 6) {
      res.render("admin/public/error.html", {
        "redirectUrl": `/${req.app.locals.adminPath}/manager/edit?id=`+id,
        "message": "密码不能少于6位"
      })
      return;
    }
    if(password !== rpassword) {
      res.render("admin/public/error.html", {
        "redirectUrl": `/${req.app.locals.adminPath}/manager/edit?id=`+id,
        "message": "密码和确认密码不一致"
      })
      return;
    }
    await ManagerModel.updateOne({"_id": id}, {
      "password": md5(password),
      "email": email,
      "mobile": mobile,
      "status": status
    })
  } else {
    await ManagerModel.updateOne({"_id": id}, {
      "email": email,
      "mobile": mobile,
      "status": status
    })
  }
  res.redirect(`/${req.app.locals.adminPath}/manager`)
})

router.get("/delete", async (req, res) => {
  let id = req.query.id
  await ManagerModel.deleteOne({"_id": id})
  res.redirect(`/${req.app.locals.adminPath}/manager`)
})

module.exports = router;

const express = require('express');
let router = express.Router();
var svgCaptcha = require('svg-captcha');
var md5 = require('md5');
const ManagerModel = require("../../model/managerModel")

router.get('/', function(req, res) {
  res.render("admin/login/login.html")
});

router.post("/dologin", async (req, res) => {
  let verify = req.body.verify;
  let username = req.body.username;
  let password = req.body.password;

  if(verify.toLocaleLowerCase() !== req.session.captcha.toLocaleLowerCase()) {
    res.render("admin/public/error.html", {
      "redirectUrl": "/admin/login",
      "message": "图形验证码输入错误!"
    })
    return
  }

  let result = await ManagerModel.find({username: username, password: md5(password)});
  if (result.length > 0) {
    req.session.userInfo = result[0];
    res.render("admin/public/success.html", {
      "redirectUrl": "/admin",
      "message": "登录成功!"
    })
  } else {
    res.render("admin/public/error.html", {
      "redirectUrl": "/admin/login",
      "message": "用户名或密码错误!"
    })
  }
});

router.get('/verify', function (req, res) {
  var captcha = svgCaptcha.create();
  // 保存验证码到session中
  console.log(req.session)
  req.session.captcha = captcha.text;
  
  res.type('svg');
  res.status(200).send(captcha.data);
});

router.get('/logout', function (req, res) {
  req.session.userInfo = null;
  res.redirect("/admin/login")
});

module.exports = router;

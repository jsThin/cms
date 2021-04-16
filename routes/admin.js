const express = require('express');
let router = express.Router();
const url = require('url')


// 路由中间件，判断是否登录
router.use((req, res, next) => {
  if(req.session.userInfo && req.session.userInfo.username) {
    next()
  } else {
    let pathname = url.parse(req.url).pathname;
    // if(pathname === "/login" || pathname === "/login/dologin" || pathname === "/login/verify" || pathname === "/login/logout") {
    //   next()
    // } else {
    //   res.redirect("/admin/login");
    // }
    next()
  }
})

const login = require("./admin/login.js")
const nav = require("./admin/nav.js")
const banner = require("./admin/banner.js")
const user = require("./admin/user.js")
const manager = require("./admin/manager.js")
const main = require("./admin/main.js")

router.use('/', main);
router.use('/login', login);
router.use('/nav', nav);
router.use('/banner', banner);
router.use('/user', user);
router.use('/manager', manager);

module.exports = router;

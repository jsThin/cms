const express = require('express');
const NavModel = require("../model/navModel")
const BannerModel = require("../model/bannerModel");
const url= require("url")
let router = express.Router();

router.use(async (req, res, next) => {      
  var pathname=url.parse(req.url).pathname;
  //获取公共的数据
  var navResult= await NavModel.find({"position":2}).sort({"sort":-1});
  req.app.locals.navList=navResult;
  req.app.locals.pathname=pathname;

  next()
})

router.get('/', async function(req, res) {
  let result = await BannerModel.find({"type":1}).sort({"sort":-1})
  res.render("default/index.html", {
    focusList: result
  })
});

router.get("/overview.html",(req,res)=>{
  res.render("default/overview.html")
})

router.get("/news.html",(req,res)=>{
  res.render("default/news.html")
})

router.get("/services.html",(req,res)=>{
  res.render("default/services.html")
})
router.get("/contact.html",(req,res)=>{
  res.render("default/contact.html")
})


module.exports = router;

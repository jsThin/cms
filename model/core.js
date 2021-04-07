const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if(err) {
    console.log(err)
    return
  }
  console.log("数据库连接成功")
})

module.exports = mongoose;
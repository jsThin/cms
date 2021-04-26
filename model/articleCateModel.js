const { Schema } = require("mongoose");
const mongoose = require("./core");

const ArticleCateSchema = mongoose.Schema({
  title: { type: String },
  link: { type: String },
  pid: { type: Schema.Types.Mixed },
  sub_title: { type: String },
  keywords: { type: String },
  description: { type: String },
  sort: { type: Number, default: 100 },
  status: { type: Number, default: 1 },
  add_time: { type: Number }
})

module.exports = mongoose.model("ArticleCate", ArticleCateSchema, "article_cate");
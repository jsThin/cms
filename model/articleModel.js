const { Schema } = require("mongoose");
const mongoose = require("./core");

const ArticleSchema = mongoose.Schema({
  title: { type: String },
  article_img: { type: String },
  cid: { type: Schema.Types.ObjectId },
  link: { type: String },
  content: { type: String },
  keywords: { type: String },
  description: { type: String },
  author: { type: String },
  click_count: { type: Number },
  is_hot: { type: Number },
  is_best: { type: Number },
  is_new: { type: Number },
  sort: { type: Number, default: 100 },
  status: { type: Number, default: 1 },
  add_time: { type: Number }
})

module.exports = mongoose.model("Article", ArticleSchema, "article");
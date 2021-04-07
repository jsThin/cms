const mongoose = require("./core");

const NavSchema = mongoose.Schema({
  title: { type: String },
  url: { type: String },
  add_time: { type: String },
  status: { type: Number, default: 1 }
})

module.exports = mongoose.model("Nav", NavSchema, "nav");
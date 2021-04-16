const mongoose = require("./core");

const NavSchema = mongoose.Schema({
  title: { type: String },
  link: { type: String },
  add_time: { type: String },
  position: { type: Number },
  is_opennew: { type: Number },
  sort: { type: Number },
  status: { type: Number, default: 1 }
})

module.exports = mongoose.model("Nav", NavSchema, "nav");
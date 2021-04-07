const mongoose = require("./core");

let ManagerSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  mobile: { type: String },
  login_time: { type: Number },
  add_time: { type: Number },
  status: { type: Number, default: 1}
})

module.exports = mongoose.model("Manager", ManagerSchema, "manager");
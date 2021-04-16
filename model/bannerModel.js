const mongoose = require("./core");

const BannerSchema = mongoose.Schema({
  title: { type: String },
    type: { type: Number },
    banner_img: { type: String },
    link: { type: String },
    sort: { type: Number },
    status: { type: Number, default: 1 },
    add_time: {
        type: Number        
    }
})

module.exports = mongoose.model("Banner", BannerSchema, "banner");
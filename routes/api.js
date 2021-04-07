const express = require('express');
let router = express.Router();

router.get("/", (req, res, next) => {
  res.send("api接口")
});

module.exports = router;
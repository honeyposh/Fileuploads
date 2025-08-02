const express = require("express");
const route = express.Router();
const upload = require("../utils/multer");
const { kycArrayUpload } = require("../controllers/kycController");
route.post("/arrayupload", upload.array("document", 3), kycArrayUpload);
module.exports = route;

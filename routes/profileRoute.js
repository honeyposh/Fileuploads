const express = require("express");
const route = express.Router();
const upload = require("../utils/multer");
const { profilesingleUpload } = require("../controllers/profileController");

route.post("/singleupload", upload.single("profilePix"), profilesingleUpload);
module.exports = route;

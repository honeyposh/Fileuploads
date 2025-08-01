const express = require("express");
const route = express.Router();
const upload = require("../utils/multer");
const { postMultipleUpload } = require("../controllers/postController");
const multiUpload = upload.fields([
  { name: "previewPix", maxCount: 1 },
  { name: "detailPix", maxCount: 1 },
]);

route.post("/multipleuploads", multiUpload, postMultipleUpload);
module.exports = route;

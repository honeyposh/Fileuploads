const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  previewPix: [{ type: String, required: true }],
  detailPix: [{ type: String, required: true }],
});
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;

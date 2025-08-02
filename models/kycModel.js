const mongoose = require("mongoose");
const kycSchema = mongoose.Schema({
  document: [{ type: String, required: true }],
});
const kycModel = mongoose.model("Kyc", kycSchema);
module.exports = kycModel;

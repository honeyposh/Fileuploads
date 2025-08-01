const mongoose = require("mongoose");
const kycSchema = mongoose.Schema({
  frontDoc: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  backDoc: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
});
const kycModel = mongoose.model("Kyc", kycSchema);
module.exports = kycModel;

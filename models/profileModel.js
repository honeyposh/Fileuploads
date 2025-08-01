const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
  profilePix: {
    type: String,
    required: true,
  },
  profilePixId: {
    type: String,
    required: true,
  },
});
const profileModel = mongoose.model("Profile", profileSchema);
module.exports = profileModel;

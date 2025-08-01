const cloudinary = require("../utils/cloudinary");
const profileModel = require("../models/profileModel");
const fs = require("fs/promises");
exports.profilesingleUpload = async (req, res, next) => {
  try {
    const profileRespnse = await cloudinary.uploader.upload(req.file.path, {
      folder: "Axia",
    });
    const newProfileUpload = await profileModel.create({
      profilePix: profileRespnse.secure_url,
      profilePixId: profileRespnse.public_id,
    });
    fs.unlink(req.file.path);
    res.status(200).json(newProfileUpload);
  } catch (error) {
    fs.unlink(req.file.path);
    return next(error);
  }
};

const cloudinary = require("../utils/cloudinary");
const kycModel = require("../models/kycModel");
const fs = require("fs/promises");
exports.kycArrayUpload = async (req, res, next) => {
  const filePath = [];
  console.log(filePath);
  try {
    const file = req.files;
    const uploadFiles = [];
    if (!req.files || req.files.length === 0) {
      const error = new Error("No files uploaded");
      error.status = 400;
      next(error);
    }
    for (const x of file) {
      filePath.push(x.path);
      const response = await cloudinary.uploader.upload(x.path, {
        folder: "Axia",
      });
      uploadFiles.push(response.secure_url);
      await fs.unlink(x.path);
    }
    console.log(filePath);
    const kyc = await kycModel.create({ document: uploadFiles });
    return res.status(200).json({ kyc });
  } catch (error) {
    for (const path of filePath) {
      try {
        await fs.unlink(path);
      } catch (error) {
        console.log(error);
      }
    }

    return next(error);
  }
};

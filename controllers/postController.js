const postModel = require("../models/postModel");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs/promises");

exports.postMultipleUpload = async (req, res, next) => {
  const filePath = [];
  console.log(filePath);
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("No files uploaded");
      error.status = 400;
      next(error);
    }
    const uploadedFiles = {};
    for (const fieldName of Object.keys(req.files)) {
      uploadedFiles[fieldName] = [];
      for (const file of req.files[fieldName]) {
        filePath.push(file.path);
        const response = await cloudinary.uploader.upload(file.path, {
          folder: "Axia",
        });
        uploadedFiles[fieldName].push(response.secure_url);
        fs.unlink(file.path);
      }
    }
    const postupload = await postModel.create({
      previewPix: uploadedFiles["previewPix"] || [],
      detailPix: uploadedFiles["detailPix"] || [],
    });
    console.log(filePath);
    return res.json(postupload);
  } catch (error) {
    for (path of filePath) {
      try {
        await fs.unlink(path);
      } catch (error) {
        console.log(error);
      }
    }
    return next(error);
  }
};

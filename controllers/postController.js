const postModel = require("../models/postModel");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs/promises");
const safeUnlink = async (filePath) => {
  if (filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.log(error);
    }
  }
};
exports.postMultipleUpload = async (req, res, next) => {
  const file = req.files;
  let uploadedImages = [];
  const cleanupFiles = async () => {
    await safeUnlink(file?.["previewPix"]?.[0]?.path);
    await safeUnlink(file?.["detailPix"]?.[0]?.path);
  };
  try {
    const previewPixResponse = await cloudinary.uploader.upload(
      file["previewPix"][0].path,
      { folder: "axia" }
    );
    uploadedImages.push(previewPixResponse.public_id);

    const detailPixResponse = await cloudinary.uploader.upload(
      file["detailPix"][0].path,
      { folder: "axia" }
    );
    uploadedImages.push(detailPixResponse.public_id);
    const newPost = await postModel.create({
      detailPix: detailPixResponse.secure_url,
      previewPix: previewPixResponse.secure_url,
      detailPixId: detailPixResponse.public_id,
      previewPixId: previewPixResponse.public_id,
    });
    await cleanupFiles();
    return res.status(201).json({ newPost });
  } catch (error) {
    for (const publicId of uploadedImages) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log(error);
      }
    }
    await cleanupFiles();
    next(error);
  }
};

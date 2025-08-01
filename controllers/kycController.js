const cloudinary = require("../utils/cloudinary");
const kycModel = require("../models/kycModel");
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
exports.kycArrayUpload = async (req, res, next) => {
  const file = req.files;
  let uploadedImages = [];
  const cleanupFiles = async () => {
    await safeUnlink(file?.[0]?.path);
    await safeUnlink(file?.[1]?.path);
  };
  try {
    const backPixResponse = await cloudinary.uploader.upload(file[0].path, {
      folder: "axia",
    });
    uploadedImages.push(backPixResponse.public_id);
    const frontPixResponse = await cloudinary.uploader.upload(file[1].path, {
      folder: "axia",
    });
    uploadedImages.push(frontPixResponse.public_id);
    const kyc = await kycModel.create({
      backDoc: {
        url: backPixResponse.secure_url,
        publicId: backPixResponse.public_id,
      },
      frontDoc: {
        url: frontPixResponse.secure_url,
        publicId: frontPixResponse.public_id,
      },
    });
    await cleanupFiles();
    return res.status(201).json({ kyc });
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

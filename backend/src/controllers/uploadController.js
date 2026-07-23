const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'campusfix/issues',
        resource_type: 'image',
        public_id: `${Date.now()}-${originalName.split('.')[0]}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image',
      });
    }

    const uploadResults = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, file.originalname))
    );

    const urls = uploadResults.map((result) => result.secure_url);

    return res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      count: urls.length,
      urls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while uploading images',
    });
  }
};

module.exports = { uploadImages };

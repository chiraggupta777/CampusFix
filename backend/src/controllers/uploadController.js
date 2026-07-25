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
    console.log('[Upload] Starting image upload...');
    console.log('[Upload] Files received:', req.files ? req.files.length : 0);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image',
      });
    }

    console.log('[Upload] Cloudinary config check:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET',
      api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET',
    });

    const uploadResults = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, file.originalname))
    );

    const urls = uploadResults.map((result) => result.secure_url);

    console.log('[Upload] Upload successful, URLs:', urls);

    return res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      count: urls.length,
      urls,
    });
  } catch (error) {
    console.error('[Upload] Error details:', error);
    console.error('[Upload] Error message:', error.message);
    console.error('[Upload] Error stack:', error.stack);
    return res.status(500).json({
      success: false,
      message: 'Server error while uploading images',
      error: error.message,
    });
  }
};

module.exports = { uploadImages };

const multer = require('multer');
const path = require('path');

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const PDF_TYPES = ['application/pdf'];

const makeUploader = ({ prefix, maxSizeMB = 5, allowedMimeTypes = IMAGE_TYPES }) => {
  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${prefix}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const err = new Error(`Invalid file type. Allowed: ${allowedMimeTypes.join(', ')}`);
        err.statusCode = 400;
        return cb(err);
      }
      cb(null, true);
    },
  });
};

module.exports = { makeUploader, IMAGE_TYPES, PDF_TYPES };

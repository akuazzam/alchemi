const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      bucketName: 'uploads', 
      filename: `${Date.now()}-file-${file.originalname}` // Generate unique file name
    };
  }
});

const upload = multer({ storage });

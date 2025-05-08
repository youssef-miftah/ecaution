const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controller = require('../../controllers/dashboardController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads', path.dirname(file.originalname));
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.any(), controller.uploadFolder);

module.exports = router;

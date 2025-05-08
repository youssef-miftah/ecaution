const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/fileController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // à adapter selon ta config

router.post('/:folderId', upload.single('file'), fileController.uploadFile);

module.exports = router;

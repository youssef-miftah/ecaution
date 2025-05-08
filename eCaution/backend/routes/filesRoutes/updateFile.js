const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/fileController');

router.put('/:fileId', fileController.updateFile);

module.exports = router;

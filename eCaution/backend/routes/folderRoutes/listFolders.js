const express = require('express');
const router = express.Router();
const controller = require('../../controllers/dashboardController');

router.get('/', controller.listFolders);

module.exports = router;

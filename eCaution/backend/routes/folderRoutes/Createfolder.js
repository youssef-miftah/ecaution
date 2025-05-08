const express = require('express');
const router = express.Router();
const controller = require('../../controllers/dashboardController');

router.post('/', controller.createFolder);

module.exports = router;

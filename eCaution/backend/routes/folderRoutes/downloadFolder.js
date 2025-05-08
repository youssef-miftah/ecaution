const express = require('express');
const router = express.Router();
const controller = require('../../controllers/dashboardController');

router.get('/:id/download', controller.downloadFolder);

module.exports = router;

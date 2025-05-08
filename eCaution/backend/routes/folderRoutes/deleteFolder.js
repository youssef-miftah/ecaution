const express = require('express');
const router = express.Router();
const controller = require('../../controllers/dashboardController');

router.delete('/:id', controller.deleteFolder);

module.exports = router;

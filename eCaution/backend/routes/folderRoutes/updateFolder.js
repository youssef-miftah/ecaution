const express = require('express');
const router = express.Router();
const controller = require('../../controllers/dashboardController');

router.put('/:id', controller.updateFolder);

module.exports = router;

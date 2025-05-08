// routes/dashboard/createFile.js
const express = require('express');
const router = express.Router();
const { createFile } = require('../../controllers/fileController');

// Route pour créer un fichier
router.post('/', createFile);

module.exports = router;

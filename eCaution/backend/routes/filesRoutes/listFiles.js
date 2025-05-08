const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/fileController');

// Liste tous les fichiers d’un dossier
router.get('/:folderId', fileController.listFilesInFolder);

module.exports = router;

const express = require('express');
const router = express.Router();

router.use('/', require('./listFolders'));
router.use('/folder', require('./createFolder'));
router.use('/folder', require('./deleteFolder'));
router.use('/folder', require('./updateFolder'));
router.use('/folder', require('./addFile'));
router.use('/folder/upload', require('./uploadFolder'));
router.use('/folder', require('./downloadFolder'));

module.exports = router;

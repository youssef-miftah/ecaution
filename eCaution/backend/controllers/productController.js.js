const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// Tu peux remplacer ce qui suit par tes modèles Mongoose
// const File = require('../models/File');
// const Folder = require('../models/Folder');

const basePath = path.join(__dirname, '../storage'); // à adapter si nécessaire

// Créer un fichier dans un dossier existant ou nouveau dossier
exports.createFile = (req, res) => {
  const folderId = req.params.folderId;
  const { fileName, content } = req.body;

  const folderPath = path.join(basePath, folderId || uuidv4());

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    // 💡 Ici tu pourrais enregistrer dans MongoDB le nouveau dossier et ses droits par défaut
  }

  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, content || '', (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la création du fichier.' });
    res.status(201).json({ message: 'Fichier créé avec succès.', filePath });
  });
};

// Supprimer un fichier
exports.deleteFile = (req, res) => {
  const fileId = req.params.fileId;
  const filePath = path.join(basePath, fileId); // à adapter si tu as une structure plus précise

  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).json({ message: 'Fichier non trouvé.' });
    res.status(200).json({ message: 'Fichier supprimé.' });
  });
};

// Télécharger un fichier
exports.downloadFile = (req, res) => {
  const fileId = req.params.fileId;
  const filePath = path.join(basePath, fileId);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Fichier introuvable.' });
  }

  res.download(filePath);
};

// Mettre à jour un fichier (contenu uniquement ici)
exports.updateFile = (req, res) => {
  const fileId = req.params.fileId;
  const { content } = req.body;
  const filePath = path.join(basePath, fileId);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Fichier introuvable.' });
  }

  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour.' });
    res.status(200).json({ message: 'Fichier mis à jour.' });
  });
};

// Lister les fichiers d’un dossier
exports.listFilesInFolder = (req, res) => {
  const folderId = req.params.folderId;
  const folderPath = path.join(basePath, folderId);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ message: 'Dossier introuvable.' });
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la lecture du dossier.' });
    res.status(200).json({ files });
  });
};

// Upload de fichier via formulaire
exports.uploadFile = (req, res) => {
  const folderId = req.params.folderId;
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
  }

  const targetDir = path.join(basePath, folderId);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetPath = path.join(targetDir, uploadedFile.originalname);

  fs.rename(uploadedFile.path, targetPath, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors du déplacement du fichier.' });
    res.status(200).json({ message: 'Fichier téléchargé avec succès.', file: targetPath });
  });
};

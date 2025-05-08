const path = require('path');
const fs = require('fs');
let folders = require('../../routes/dashboard/foldersData');

exports.createFolder = (req, res) => {
  const { folderName, priority } = req.body;
  if (!folderName || !priority) {
    return res.status(400).json({ message: 'Name and priority required' });
  }

  const newFolder = { id: folders.nextId++, name: folderName, priority, files: [] };
  folders.list.push(newFolder);
  res.status(201).json(newFolder);
};

exports.listFolders = (req, res) => {
  res.json(folders.list);
};

exports.deleteFolder = (req, res) => {
  const id = parseInt(req.params.id);
  const index = folders.list.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).json({ message: 'Folder not found' });

  folders.list.splice(index, 1);
  res.status(204).send();
};

exports.downloadFolder = (req, res) => {
  const id = parseInt(req.params.id);
  const folder = folders.list.find(f => f.id === id);
  if (!folder) return res.status(404).json({ message: 'Folder not found' });

  const folderPath = path.join(__dirname, '../../uploads', folder.name);
  res.download(folderPath, `${folder.name}.zip`, err => {
    if (err) res.status(500).send('Download failed');
  });
};

exports.uploadFolder = (req, res) => {
  res.status(200).json({ message: 'Folder uploaded successfully' });
};

exports.updateFolder = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, priority } = req.body;
  const folder = folders.list.find(f => f.id === id);
  if (!folder) return res.status(404).json({ message: 'Folder not found' });

  folder.name = name;
  folder.priority = priority;
  res.json(folder);
};

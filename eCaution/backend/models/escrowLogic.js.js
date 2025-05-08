const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  size: { type: Number },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);

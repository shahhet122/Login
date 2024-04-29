const mongoose = require('mongoose');
const keys = require('../config/keys');
const fileSchema = mongoose.Schema({
    keys: { type: String, required: true },
    size: Number,
    mimetype: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

module.exports = File;
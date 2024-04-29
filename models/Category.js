const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        updatedBy: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    }
}, { timestamps: true });

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
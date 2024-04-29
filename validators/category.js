const { check, param } = require('express-validator');
const mongoose = require('mongoose');

const addCategoryValidator = [
    check('title').notEmpty().withMessage('Title is required'),
];

const idValidator = [
    param('id').custom((id) => {
        if (id & !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid id');
        }
        return true;
    })
];

module.exports = { addCategoryValidator, idValidator };
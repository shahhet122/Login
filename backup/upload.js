const multer = require('multer');
const path = require('path');
const generateCode = require('../utils/generateCode');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const fileName = originalName.replace(extension, "");
        const compressedFileName = fileName.split(" ").join("_");
        const lowercaseFileName = compressedFileName.toLowerCase();
        const code = generateCode(12);
        const finalFile = `${lowercaseFileName}_${code}${extension}`;
        callback(null, finalFile);

    }

});

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const mimetype = file.mimetype;
        if (mimetype == 'image/jpg' || mimetype == 'image/jpeg' || mimetype == 'image/png' || mimetype == 'application/pdf') {
            callback(null, true);
        } else {
            callback(new Error('File type not supported'));
        }

    },
});

module.exports = upload;
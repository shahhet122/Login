const path = require('path');
const { validateExt } = require('../validators/file');
const { uploadFiletoS3 } = require('../utils/awsS3');

const uploadFile = async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            res.code = 400;
            throw new Error('Please upluoad a file');

        }
        const ext = path.extname(file.originalname);
        const isValidExt = validateExt(ext);
        if (!isValidExt) {
            res.code = 400;
            throw new Error('File type not supported');
        }
        const key = await uploadFiletoS3({ file, ext });
        res.status(201).json({ code: 201, status: true, message: 'File uploaded successfully', data: { key } });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    uploadFile
};  
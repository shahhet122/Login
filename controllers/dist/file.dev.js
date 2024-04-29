"use strict";

var path = require('path');

var _require = require('../validators/file'),
    validateExt = _require.validateExt;

var _require2 = require('../utils/awsS3'),
    uploadFiletoS3 = _require2.uploadFiletoS3;

var uploadFile = function uploadFile(req, res, next) {
  var file, ext, isValidExt, key;
  return regeneratorRuntime.async(function uploadFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          file = req.file;

          if (file) {
            _context.next = 5;
            break;
          }

          res.code = 400;
          throw new Error('Please upluoad a file');

        case 5:
          ext = path.extname(file.originalname);
          isValidExt = validateExt(ext);

          if (isValidExt) {
            _context.next = 10;
            break;
          }

          res.code = 400;
          throw new Error('File type not supported');

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(uploadFiletoS3({
            file: file,
            ext: ext
          }));

        case 12:
          key = _context.sent;
          res.status(201).json({
            code: 201,
            status: true,
            message: 'File uploaded successfully',
            data: {
              key: key
            }
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  uploadFile: uploadFile
};
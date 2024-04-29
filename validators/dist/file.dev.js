"use strict";

var validateExt = function validateExt(ext) {
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validateExt: validateExt
};
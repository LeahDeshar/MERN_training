const multer = require("multer");
const storage = multer.memoryStorage();

module.exports.singleUpload = multer({ storage }).single("file");

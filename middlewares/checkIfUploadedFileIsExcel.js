const multer = require("../modules/fileUploads").multer;
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, callbackFunction) {
    const uploadPath = path.join(__dirname, "../uploads/excels/");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    callbackFunction(null, uploadPath);
  },
  filename: function (req, file, callbackFunction) {
    callbackFunction(null, Date.now() + ".xlsx");
  },
});
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(path.extname(file.originalname));
    if (path.extname(file.originalname) === ".xlsx") {
      cb(null, true);
    } else {
      function Error(message) {
        this.message = message;
        this.ext = path.extname(file.originalname);
      }
      cb(new Error("only excel file is allowed"));
    }
  },
});

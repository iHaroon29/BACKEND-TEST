const multer=require("multer");
const path=require("path");
const fs=require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, callbackFunction) {
        const uploadPath=path.join(__dirname,"../uploads");
        // fs.mkdirSync(uploadPath); // uncomment this line if uploads folder doesn't exists in your root directory
        callbackFunction(null,uploadPath)
    },
    filename: function (req, file, callbackFunction) {
        const fileExtension=file.mimetype.split("/")[1];
        const fileName=Date.now()+"."+fileExtension;
        callbackFunction(null, fileName);
    }
});
const CourseUpload = multer.diskStorage({
    destination: function (req, file, callbackFunction) {
        const uploadPath=path.join(__dirname,"../uploads/courses");
        // fs.mkdirSync(uploadPath); // uncomment this line if uploads folder doesn't exists in your root directory
        callbackFunction(null,uploadPath)
    },
    filename: function (req, file, callbackFunction) {
        const fileExtension=file.mimetype.split("/")[1];
        const fileName=Date.now()+"."+fileExtension;
        callbackFunction(null, fileName);
    }
});

module.exports.RootFolderUpload=multer({ storage: storage });
module.exports.CourseUpload=multer({ storage: CourseUpload });

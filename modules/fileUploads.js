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
const StudentProfilePicture = multer.diskStorage({
    destination: function (req, file, callbackFunction) {
        const uploadPath=path.join(__dirname,"../uploads/student/profilePictures");
        // fs.mkdirSync(uploadPath); // uncomment this line if uploads folder doesn't exists in your root directory
        callbackFunction(null,uploadPath)
    },
    filename: function (req, file, callbackFunction) {
        const fileExtension=file.mimetype.split("/")[1];
        const fileName=Date.now()+"."+fileExtension;
        callbackFunction(null, fileName);
    }
});

const TeacherProfilePicture = multer.diskStorage({
    destination: function (req, file, callbackFunction) {
        const uploadPath=path.join(__dirname,"../uploads/teacher/profilePictures");
        // fs.mkdirSync(uploadPath); // uncomment this line if uploads folder doesn't exists in your root directory
        callbackFunction(null,uploadPath)
    },
    filename: function (req, file, callbackFunction) {
        const fileExtension=file.mimetype.split("/")[1];
        const fileName=Date.now()+"."+fileExtension;
        callbackFunction(null, fileName);
    }
});

module.exports.multer=multer;
module.exports.RootFolderUpload=multer({ storage: storage });
module.exports.CourseUpload=multer({ storage: CourseUpload });
module.exports.StudentProfilePictureUpload=multer({ storage: StudentProfilePicture });
module.exports.TeacherProfilePictureUpload=multer({ storage: TeacherProfilePicture });

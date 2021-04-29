const multer=require("multer");
const path=require("path");
const fs=require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, callbackFunction) {
        const uploadPath=path.join(__dirname,"../uploads");
        fs.mkdirSync(uploadPath);
        callbackFunction(null,path.join(__dirname,"../uploads"))
    },
    filename: function (req, file, callbackFunction) {
        const fileExtension=file.mimetype.split("/")[1];
        const fileName=Date.now()+"."+fileExtension;
        callbackFunction(null, fileName);
    }
});

module.exports=multer({ storage: storage });


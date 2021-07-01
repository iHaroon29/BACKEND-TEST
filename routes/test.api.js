const route=require("express").Router();
const Excel=require("../middlewares/checkIfUploadedFileIsExcel");
const multer=require("multer");
const excelFileUploadFiled=Excel.single("excel");
const xlsx=require("xlsx");
const path=require("path")

route.post("/test/excel",(req,res)=>{
    excelFileUploadFiled(req,res,(err)=>{
        if(err instanceof multer.MulterError || (err && err.message && err.message==="only excel file is allowed")){
            return res.status(400).send(err);
        }
        else{
            console.log(xlsx.readFile(req.file.path));
            return res.send(req.file)
        }
    });
});

module.exports=route;
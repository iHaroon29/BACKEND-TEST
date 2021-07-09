const route = require("express").Router();
const Excel = require("../middlewares/checkIfUploadedFileIsExcel");
const multer = require("multer");
const excelFileUploadFiled = Excel.single("excel");

const ExcelConvertor = require("../modules/excel.converter")

route.post("/test/excel", (req, res) => {
  // excelFileUploadFiled(req, res, (err) => {
  //   if (
  //     err instanceof multer.MulterError ||
  //     (err && err.message && err.message === "only excel file is allowed")
  //   ) {
  //     return res.status(400).send(err);
  //   } else {
  //    return res.send(ExcelConvertor.excelToJson(req.file.path))
  //   }
  // });

  const fileLocation = ExcelConvertor.jsontoExcel(req.body)
  return res.download(fileLocation)
},

);

module.exports = route;

const xlsx = require("xlsx");

module.exports = {
    excelToJson(excelFileLocation){
        var workBook = xlsx.readFile(excelFileLocation);
        var workSheet = workBook.Sheets[workBook.SheetNames[0]];
        // console.log(workSheet)
        return xlsx.utils.sheet_to_json(workSheet);
        //    console.log(data)
        
    }
}
const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path")

module.exports = {
    excelToJson(excelFileLocation){
        var workBook = xlsx.readFile(excelFileLocation);
        var workSheet = workBook.Sheets[workBook.SheetNames[0]];
        // console.log(workSheet)
        return xlsx.utils.sheet_to_json(workSheet, {raw:false});
        //    console.log(data)
        
    },

    jsontoExcel(jsonData){
        // let content = JSON.parse(jsonData, 'utf-8')
        let fileName = Date.now() + ".xlsx"
        let newWB = xlsx.utils.book_new()
        let newWS = xlsx.utils.json_to_sheet(jsonData)
        xlsx.utils.book_append_sheet(newWB, newWS, "new Data")
        let newExcel =  xlsx.writeFile(newWB, "./downloads/excel/" + fileName)
        return path.join("../downloads/excel", fileName)
    }
}
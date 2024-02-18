
const XLSX = require("xlsx")

export class CommonUtils{

    async readExcel(path) {
        const workbook = XLSX.readFile(path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonSheet = XLSX.utils.sheet_to_json(sheet);
        //console.log(jsonSheet);
        return jsonSheet;
    }

    async writeExcel(fileName, sheetName, dataToWrite){
        const workbook = XLSX.readFile(fileName);
        //const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonToSheet = XLSX.utils.json_to_sheet(dataToWrite);
        XLSX.utils.book_append_sheet(workbook,jsonToSheet,sheetName)
        const data = XLSX.writeFile(workbook,fileName)
        console.log(data)
        return data;
    }
    
}

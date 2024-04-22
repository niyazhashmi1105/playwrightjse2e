const XLSX = require('xlsx');
const fs = require('node:fs');


// Load the workbook
const workbook = XLSX.readFile('D:\\MODESE\\TestData\\Student core december\\Student_Core_December_Layout_Rule.xlsx');




// Get the sheets
const sheet1 = workbook.Sheets['Layout']; // Change sheet names as needed
const sheet2 = workbook.Sheets['Rule']; // Change sheet names as needed


// Function to join data from two sheets
function joinData(sheet1, sheet2, columnToMatch) {
    const result = [];


    // Convert sheet data to array of objects
    const data1 = XLSX.utils.sheet_to_json(sheet1);
    const data2 = XLSX.utils.sheet_to_json(sheet2);


    // Create a map of matching values from sheet2
    const map = {};
    data2.forEach(row => {
        const key = row[columnToMatch];
        if (!map[key]) {
            map[key] = [];
        }
        map[key].push(row);
    });


    // Join data from sheet1 and sheet2
    data1.forEach(row => {
        const key = row[columnToMatch];
        if (map[key]) {
            map[key].forEach(matchingRow => {
                result.push({...row, ...matchingRow});
            });
        }
    });


    return result;
}


// Join data based on a matching column
const joinedData = joinData(sheet1, sheet2, 'Item Name'); // Change the column name to match


// Convert joined data to worksheet
const ws = XLSX.utils.json_to_sheet(joinedData);


// Add the new sheet to the workbook
XLSX.utils.book_append_sheet(workbook, ws, 'JoinedData'); // Change the sheet name as needed


// Write the updated workbook back to the file
XLSX.writeFile(workbook, 'D:\\MODESE\\TestData\\Student core december\\Student_Core_December_Layout_Rule.xlsx');




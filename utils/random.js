const {faker}  = require('@faker-js/faker');
const xlsx = require('xlsx')
const fs = require('fs');


function generateUsers() {

  let users = []

  for (let id=1; id <= 100; id++) {

    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let email = faker.internet.email();
    let birthdate = faker.person.birthdate;


    users.push({
        "id": id,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "dateOfBirth": birthdate,
    });
  }

  return { "data": users }
}

let dataObj = generateUsers();

console.log(dataObj)
fs.writeFileSync('../resources/randomdata.json', JSON.stringify(dataObj, null, '\t'));

// const fields = ['id','first_name','last_name','email']

// const csv = json2csv(dataObj)
// //console.log(csv)

// fs.writeFileSync('../resources/data.csv',csv,(err)=>{
//     if(err) throw err
//     console.log('CSV File saved')
// })

var rawFile = fs.readFileSync("../resources/randomdata.json")//dir of your json file as param
var raw = JSON.parse(rawFile)
var files  = []
for (each in raw){
    files.push(raw[each])
    }  
   var obj = files.map((e) =>{
        return e
       })
   var newWB = xlsx.utils.book_new()
   var newWS = xlsx.utils.json_to_sheet(obj)
   xlsx.utils.book_append_sheet(newWB,newWS,"name")//workbook name as param
   xlsx.writeFile(newWB,"Sample-Data.xlsx")//file name as param
console.log("Excel file data written successfully")

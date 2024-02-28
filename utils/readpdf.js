const fs = require('fs')
const pdfParse = require('pdf-parse')

const getPDF = async(filename)=>{

    let readFileSync = fs.readFileSync(filename)
    try{
            let pdfExtract = await pdfParse(readFileSync)
            console.log('File Contents: ', pdfExtract.text)
        }catch(error){
            throw new Error(error)
        }
}
const pdfRead = '../resources/devops.pdf'
getPDF(pdfRead)

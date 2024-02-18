import { test } from "@playwright/test";
import {CommonUtils} from "../utils/common";


test("Read excel file contents", async ({}) => {
const commonUtils = new CommonUtils()
const filePath = "./resources/dummyexcel.xlsx"
const records = await commonUtils.readExcel(filePath)
console.log(records)

let index=0;
for(const record of records){
    console.log(await record["username"]+":"+record["password"]);
    index++
    if(await record["username"] === "U3"){
        console.log(index)
        console.log(`${record["username"]} present at index ${index}`)
        break
    }
}
})

test.skip("Write excel file contents", async ({}) => {
    const commonUtils = new CommonUtils()
    const filePath = "./resources/dummyexcel.xlsx"

    let writeData = [
        {
            username: 'U6',
            password: 'P6',
            firstname: 'TestFN6',
            lastname: 'TestLN6',
            address: 'Test ADDR6',
            postalcode: 1234567890
        }]    
    const records = await commonUtils.writeExcel(filePath,"Sheet2",writeData)
    console.log(records)
})


import { test } from "@playwright/test";
import {MysqlAwsRdsConnection} from "../utils/mysqldbconnect";

test.skip("Test MYSQL Database Connection with AWS RDS", async({})=>{

const dbObj = new MysqlAwsRdsConnection();
dbObj.dbConnect();
})
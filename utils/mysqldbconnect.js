const mysql = require('mysql')

//export class MysqlAwsRdsConnection{

//async dbConnect(){
const conn = mysql.createConnection({
    host: "testdbinst01.cf48mk6cwnqm.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "adminpassword",
    database: "testdbname01",
    port: '3306'
});

conn.connect(function(err) {
    if (err) 
        console.log("Error in Connecting to the database")
    else
        console.log("Database connection establish successfully")
        conn.query("SELECT name FROM customers WHERE address = 'Highway 37'", function (err, result) {
        if (err) throw err;
        console.log(result);
});
});
//}
//}
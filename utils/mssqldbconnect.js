const sql = require('mssql/msnodesqlv8')

const sqlConfig = {
    user: "admin",
    password: "adminpassword",
    database: "testdb",
    driver: "msnodesqlv8",
    server: "mssqlserverinst.cf48mk6cwnqm.us-east-1.rds.amazonaws.com,1433",
    port: "1433",
    options:{
                trustedConnection: true
            }
}
    
        try{
                sql.connect(sqlConfig, function(err){
                    if(err)console.log(err)
                    const req = new sql.Request();
                    req.query("select * from student", function(err,records){
                    if(err)console.log(err)
                    else console.log(records)
                    })
                })
                
            }catch(err){
                    console.log("Error in connecting database",err)
            }





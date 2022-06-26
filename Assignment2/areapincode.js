let dbparams = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "studydbt",
    port: 3306,
  };
  const mysql = require("mysql2");
  const connection = mysql.createConnection(dbparams);
  
  const express = require("express");
  const app = express();
  
  app.use(express.static("cp"));


  app.get('/getPinCode',(req,res)=>{
    let input=req.query.pincode;

    connection.query('select * from areapincode where pincode=?',[input],(err,rows)=>{
        if(err){
            console.log("Error occured at server side : "+err);
        }else{
            let op={status:false,data:{pincode:null,area:null}}
            if(rows.length==1){
                console.log("area   "+rows);
                op.status=true;
                op.data.pincode=rows[0].pincode;
                op.data.area=rows[0].area;
                res.send(op);
            }else{
                res.send(op);
            }
        }
    });

  });

  app.listen(900, function () {
    console.log("server listening at port 900...");
  });
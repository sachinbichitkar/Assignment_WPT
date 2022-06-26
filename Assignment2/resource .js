 const express = require("express");
 const app = express();

 const mysql = require("mysql2");

  let dbparams = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "studydbt",
    port: 3306,
  };
  const connection = mysql.createConnection(dbparams);
  
  
  app.use(express.static("cp"));
  
  app.get("/getResource", (req, resp) => {
    let resourceid = req.query.resourceid;
    
    console.log("Input " + resourceid);
    let output = {
      status: false,
      itemDetails: { resourceid: "", resourcename: "", status:"" },
    };
      connection.query("select * from resource where resourceid=?",[resourceid],(error, rows) => {
          console.log(rows);
          if (error) {
            console.log(error);
          } else if (rows.length > 0) {
            output.status = true;
            output.itemDetails.resourceid= rows[0].resourceid;
            output.itemDetails.resourcename= rows[0].resourcename;
            output.itemDetails.status= rows[0].status;
            console.log(output);
            resp.send(output);
          }
         console.log(output);
         resp.send(output);
          
        });
  });
  
  app.get("/showAll", (req, resp) => {
    connection.query("select * from resource", [], (error, rows) => {
      console.log(rows);
      resp.send(rows);
      //resp.send(output);
    });
  });
  
 
  app.get("/addResource", (req, resp) => {
    let resourceid = req.query.resourceid;
    let rname=req.query.resourcename;
    let status=req.query.status;
    console.log("Input " + resourceid);
    let output = {status: false};
      connection.query("insert into resource values(?,?,?)",[resourceid,rname,status],(error, rows) => {
          console.log(rows);
          if (error) {
            console.log(error);
          } else if (rows.affectedRows > 0) {
            output.status = true;
           
            console.log(output);
            resp.send(output);
          }
          console.log(output);
          resp.send(output);
          
        });
  });
  
  app.get("/updateResource", (req, resp) => {
    let resourceid = req.query.resourceid;
    let rname=req.query.resourcename;
    let status=req.query.status;
    console.log("Input " + resourceid);
    let output = {status: false};
      connection.query("update table resource set resourcename=? and status=? where resourceid=?)",[rname,status,resourceid],(error, rows) => {
          console.log(rows);
          if (error) {
            console.log(error);
          } else if (rows.affectedRows > 0) {
            output.status = true;
           
            console.log(output);
            resp.send(output);
          }
          console.log(output);
          resp.send(output);
          
        });
  });
  
  app.listen(900, function () {
    console.log("server listening at port 900...");
  });
  
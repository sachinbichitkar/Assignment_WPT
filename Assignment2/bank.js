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
  
  app.listen(900, function () {
    console.log("server listening at port 900...");
  });
  
  app.get("/getBalance", (req, resp) => {
    let accno = req.query.accno;
    console.log("Input " + accno);
    let output = {
      status: false,
      balance: "",
    };
    connection.query(
      "select balance from bank where accno=?",
      [accno],
      (error, rows) => {
        console.log(rows);
        if (error) {
          console.log(error);
        } else if (rows.length > 0) {
          output.status = true;
          output.balance = rows[0].balance;
        }
        console.log(output);
        resp.send(output);
      }
    );
  });
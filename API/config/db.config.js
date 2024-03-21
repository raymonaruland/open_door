'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Reegan@80',
	  port:'3306',
    database: 'open_door_node',  
    multipleStatements: true,
    acquireTimeout: Number.POSITIVE_INFINITY
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;

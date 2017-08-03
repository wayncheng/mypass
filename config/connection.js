'use strict';
(function(){
//==================================================
	var mysql = require("mysql");
	var connection;
	
	// Connection Config
	
	// JawsDB by default
	if (process.env.JAWSDB_URL){
		console.log('JAWSDB connecting...');
		connection = mysql.createConnection(process.env.JAWSDB_URL)
	}
	else {
		console.log('Manual JawsDB connecting...');
		connection = mysql.createConnection('mysql://rbpvai3bzmkoocta:q8z6mv2ycdbs939z@op2hpcwcbxb1t4z9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hx7hw1d9o9yvnc7h');
	}

	// local mysql if there is no JawsDB
	// else {
	// 	console.log('Local MySQL');
	// 	connection = mysql.createConnection({
	// 		port: 3306,
	// 		host: "localhost",
	// 		user: "root",
	// 		password: "batman",
	// 		database: "auth_db"
	// 	});
	// }



// var connection = mysql.createConnection('mysql://rbpvai3bzmkoocta:q8z6mv2ycdbs939z@op2hpcwcbxb1t4z9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hx7hw1d9o9yvnc7h');

	// Make connection.
	// connection.connect(function(err) {
	// 	if (err) throw err;
	// 	console.log("connected as id " + connection.threadId);
	// });

	// Export connection for our ORM to use.
	module.exports = connection;

//==================================================
})();
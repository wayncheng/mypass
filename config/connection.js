'use strict';
(function(){
//==================================================
	var mysql = require("mysql");
	// Connection Config
	
	// JawsDB by default
	// if (process.env.JAWSDB_URL){
	// 	console.log('JAWSDB connecting...');
	// 	connection = mysql.createConnection(process.env.JAWSDB_URL)
	// }
	// else {
	// 	console.log('Manual JawsDB connecting...');
	// 	connection = mysql.createConnection({
	// 		port: 3306,
	// 		host: "i943okdfa47xqzpy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	// 		user: "asv49w7g0vr0bxl2",
	// 		password: "gitl70i25n2lz8l4",
	// 		database: "w34dm5kk59cqlvw1"
	// 	});

	// }

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



// var connection = mysql.createConnection(process.env.JAWSDB_URL);

// 	// Make connection.
// 	connection.connect(function(err) {
// 		if (err) throw err;
// 		console.log("connected as id " + connection.threadId);
// 	});

// 	// Export connection for our ORM to use.
// 	module.exports = connection;

//==================================================
})();
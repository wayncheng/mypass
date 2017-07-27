'use strict';
(function(){
//==================================================
	var mysql = require("mysql");

	// Connection Config
	var connection = mysql.createConnection({
		port: 3306,
		host: "localhost",
		user: "wayne",
		password: "batman",
		database: "auth_db"
	});

	// Make connection.
	connection.connect(function(err) {
		if (err) throw err;
		console.log("connected as id " + connection.threadId);
	});

	// Export connection for our ORM to use.
	module.exports = connection;

//==================================================
})();
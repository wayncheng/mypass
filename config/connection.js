'use strict';
(function(){
//==================================================
	var mysql = require("mysql");
	var connection;
	// Connection Config
	
	// JawsDB by default
	if (process.env.JAWSDB_URL){
		connection = mysql.createConnection(process.env.JAWSDB_URL)
	}
	// local mysql if there is no JawsDB
	else {
		connection = mysql.createConnection({
			port: 3306,
			host: "localhost",
			user: "root",
			password: "",
			database: "auth_db"
		});
	}

	// Make connection.
	connection.connect(function(err) {
		if (err) throw err;
		console.log("connected as id " + connection.threadId);
	});

	// Export connection for our ORM to use.
	module.exports = connection;

//==================================================
})();
"use strict";
(function() {
	
// DEPENDENCIES ===================================
	var express = require("express");
	var app = express();
	var bodyParser = require("body-parser");
	var path = require('path');
	var handlebars = require('express-handlebars');
	var mysql
//=================================================

// CONFIG =========================================
  app.disable("x-powered-by");
  app.set("port", process.env.PORT || 3000);
  app.use(express.static(__dirname + "/public"));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  
	app.use(function(req, res, next) {
		console.log("Looking for URL : " + req.url);
		next();
	});
//=================================================

// ERRORS =========================================
	app.use(function(req, res) {
		res.type("text/html");
		res.status(404);
		res.render("404");
	});

	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500);
		res.render("500");
	});
//=================================================

// START SERVER ===================================
	// app.listen(app.get("port"), function() {
	// 	app.get("port") + "; press Ctrl-C to terminate";
	// });

// listen for requests ////////////////////////////
var listener = app.listen(process.env.PORT, 3000], function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
//=================================================

})();

'use strict';
(function(){
	
var express = require('express');
var app = express();
var path = require('path');
var handlebars = require("express-handlebars").create({ defaultLayout: "main", });
app.use(express.static(path.join(__dirname, 'public')));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	port     : "3306",
	user     : 'root',
	password : 'batman',
	database : 'benjerry_db'
});

connection.connect(function(err) {
	if (err) { return console.error('error connecting: ' + err.stack); }
	// console.log('connected as id ' + connection.threadId);
});

// ROUTES //////////////////////////////////////////
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/all", function(request, result){
	connection.query(`SELECT * FROM flavors`,[], function (err, res, fields) {
		if (err) throw err;

		// var code = '<head><link href="src/css/style.css" rel="stylesheet"></head>';
		var code = '';
		var arr = [];

			for (var i=0; i<res.length; i++){
				var ea = res[i];
				var obj = {
					'title': ea.title,
					'id': ea.id,
					'image': ea.image
				};
				arr.push(obj);

				// console.log(ea);
				// var html = `<a href="/${ea.id}" alt="${ea.title}"> <img src="${ea.image}"> </a>`;
				// code += html;
			}
		result.render('all', {flavors: arr} )
		// result.end(code);
	})
})

app.get("/:id", function(request, result){

	connection.query(`SELECT * FROM flavors WHERE id = ?`,[request.params.id], function (err, res, fields) {
		if (err) throw err;

})


// listen for requests ////////////////////////////
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



})();
"use strict";
(function() {
  // DEPENDENCIES ===================================
  var express = require("express");
  var app = express();
  var bodyParser = require("body-parser");
  var path = require("path");
  var handlebars = require("express-handlebars").create({
    defaultLayout: "main"
  });
  var mysql;
  var port = process.env.PORT || 3000;
  //=================================================

  // CONFIG =========================================
  app.disable("x-powered-by");
  app.set("port", port);

  app.use(express.static(path.join(__dirname, "public")));
  app.engine("handlebars", handlebars.engine);
  app.set("view engine", "handlebars");
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

  app.use(function(req, res, next) {
    console.log("Looking for URL : " + req.url);
    next();
  });
  //=================================================

  app.get('/',function(req,res){
	  res.render('home');
  })

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
  app.listen(port, function() {
	console.log(`-------------------------------------------------------
                                          ready @ ${port}`);
  });

  //=================================================
})();

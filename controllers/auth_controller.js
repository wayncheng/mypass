"use strict";
(function() {
  var express = require("express");
  var auth = require("../models/auth.js");
  var bodyParser = require("body-parser");
  var router = express.Router();

  /////////////////////////////////////////////////////
  router.get("/", function(req, res) {
    auth.all(function(data) {
      var hbsObject = {
        auths: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  /////////////////////////////////////////////////////
//  Add New User
  router.post("/", function(req, res) {
    console.log("req.body", req.body);

    auth.insert(
      ["username", "text_password"],
      [req.body.username, text_password],
      function() {
        res.redirect("/");
      }
	);
	
  });

  /////////////////////////////////////////////////////
//   Update Existing User
  router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    var devoured = req.body.devoured;
    var bool = false;
    if (devoured === "on") { bool = true; }

    auth.update({ devoured: bool }, condition, function() {
      res.redirect("/");
    });
  });

 module.exports = router;

})();


	// app.get('/', function(req, res) {
	// 	res.render("home", {title: "MyPass"});
	// });
	
	// app.get('/boop', function(req, res) {
	// 	res.render("home", {title: "boop"});
	// });
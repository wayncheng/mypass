"use strict";
(function() {
  var express = require("express");
  var api = require("../models/api.js");
  var bodyParser = require("body-parser");
  var router = express.Router();
  // var db = require("../models");
	var bcrypt = require("bcryptjs");
	var saltRounds = 10;
	
var flow = ['text','face','voice'];

  /////////////////////////////////////////////////////
  router.get("/api/all", function(req, res) {
    api.all(function(data) {
      console.log("data", data);
      res.json(data);
    });
  });

  //==================================================
  router.post("/api/:authtype/signup", function(req, res) {
    var authtype = req.params.authtype;
    var phase = "signup";
    var rb = req.body;
    console.log(`POST /api/${authtype}/${phase}`);
		// Set next auth type. 
		var next_guide = {
			'text': 'face',
			'face': 'voice',
			'voice': 'done'
		}
		var next_type = next_guide[authtype];
		

    bcrypt.hash(req.body.pw, saltRounds, function(err, hash) {
      console.log("hash", hash);

      api.create(
        ["username", "email", "pw", "firstname", "lastname"],
        [rb.username, rb.email, hash, rb.firstname, rb.lastname],
        function() {
          // console.log("res", res);
          res.redirect(`/signup/${next_type}`);
        }
      );
    });
  });

  //Changing this route only for Text Login, because creating same route for face Login also
  //==================================================
  router.post("/api/text/login", function(req, res) {
    // var authtype = req.params.authtype;
    var phase = "login";
    console.log(`POST /api/${authtype}/${phase}`);
		console.log('req.body.pw',req.body.pw);


		// bcrypt.hash(req.body.pw, saltRounds, function(err, hash) {
      api.get_pw(req.body.username, req.body.pw, function(response) {
        // console.log("res", res);
				console.log("access granted?", response);
				if (response === true){
					res.redirect('/login/face')
				}
				else {
					res.redirect('/login/text')
				}
      });
    // });
  });

  /////////////////////////////////////////////////////
  //  Add New User
  //   router.post("/", function(req, res) {
  //     console.log("req.body", req.body);

  //     api.insert(
  //       ["username", "text_password"],
  //       [req.body.username, text_password],
  //       function() {
  //         res.redirect("/");
  //       }
  // 	);

  //   });

  /////////////////////////////////////////////////////
  //   Update Existing User
  //   router.put("/:id", function(req, res) {
  //     var condition = "id = " + req.params.id;
  //     var devoured = req.body.devoured;
  //     var bool = false;
  //     if (devoured === "on") { bool = true; }

  //     api.update({ devoured: bool }, condition, function() {
  //       res.redirect("/");
  //     });
  //   });

  module.exports = router;
})();

// app.get('/', function(req, res) {
// 	res.render("home", {title: "MyPass"});
// });

// app.get('/boop', function(req, res) {
// 	res.render("home", {title: "boop"});
// });

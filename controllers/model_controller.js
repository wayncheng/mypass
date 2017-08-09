// blah1 is the column name/ name attr in html
"use strict";
(function() {
  var express = require("express");
  var router = express.Router();
  var bodyParser = require("body-parser");
  // var model = require("../models/model.js");
  //==================================================
  router.get("/signup/:authtype/:username?", function(req, res) {
    var authtype = req.params.authtype;
    var username = "";
    if(req.params.username){
      username = req.params.username;
    }

		if (authtype === 'done') {
			res.redirect('/verified');
		}

		var hbsParams = {
      title: "signup " + authtype,
      authtype: authtype,
      api_phase: "signup",
      layout: "signup",
      isSignup: true,
      username:username
    }
		hbsParams[authtype] = true;

    res.render(authtype, hbsParams);
  });
  router.get("/login/:authtype", function(req, res) {

		var authtype = req.params.authtype;
		
		var hbsParams = {
      title: "login " + authtype,
      authtype: authtype,
      api_phase: "login",
      layout: "login",
      isSignup: false,
      username:req.body.username
		}
		hbsParams[authtype] = true;
		
    res.render(authtype, hbsParams);
  });

  //==================================================
  router.get("/verified", function(req, res) {
    res.render("verified", {
      title: "Verified Area"
    });
  });
  router.get("/sitemap", function(req, res) {
    res.render("sitemap", {
      title: "Site Map"
    });
  });
  //==================================================
  router.get("/", function(req, res) {
    res.render("landing", {
      title: "MyPass - Home"
    });
  });

  router.get("/test", function(req, res) {
    res.render("test");
  });



  //==================================================
  module.exports = router; // Export routes for server.js to use.
  ////////////////////////////////////////////////////
})();

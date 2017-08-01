// blah1 is the column name/ name attr in html
"use strict";
(function() {
  var express = require("express");
  var router = express.Router();
  var bodyParser = require("body-parser");
  var model = require("../models/model.js");
  //==================================================
  router.get("/signup/:authtype", function(req, res) {
    var authtype = req.params.authtype;

		if (authtype === 'done') {
			res.redirect('/verified');
		}

		var hbsParams = {
      title: "signup " + authtype,
      authtype: authtype,
      api_phase: "signup",
      layout: "signup",
      isSignup: true
    }
		hbsParams[authtype] = true;

    res.render(authtype, hbsParams);
  });
  router.get("/login/:authtype", function(req, res) {
    var authtype = req.params.authtype;

    res.render(authtype, {
      title: "login " + authtype,
      authtype: authtype,
      api_phase: "login",
      layout: "login",
      isSignup: false
    });
  });

  //==================================================
  router.get("/verified", function(req, res) {
    res.render("verified", {
      title: "Verified Area"
    });
  });
  //==================================================
  router.get("/", function(req, res) {
    res.render("index", {
      title: "home"
    });
  });

  //==================================================
  module.exports = router; // Export routes for server.js to use.
  ////////////////////////////////////////////////////
})();

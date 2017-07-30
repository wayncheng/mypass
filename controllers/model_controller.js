// blah1 is the column name/ name attr in html
"use strict";
(function() {

  var express = require("express");
  var router = express.Router();
  var bodyParser = require("body-parser");
  var model = require("../models/model.js");

//==================================================
  router.get("/setup/:authtype", function(req, res) {
	var authtype = req.params.authtype;

		res.render(authtype, {
			title: 'setup '+ authtype,
			authtype: authtype,
			api_phase: 'setup',
			layout: 'setup',
			isSetup: true,
		})
  });
  router.get("/login/:authtype", function(req, res) {
	var authtype = req.params.authtype;

		res.render(authtype, {
			title: 'login '+ authtype,
			authtype: authtype,
			api_phase: 'login',
			layout: 'login',
			isSetup: false,
		})
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

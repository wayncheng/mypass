'use strict';
(function(){
  var express = require("express");
  var api = require("../models/api.js");
  var bodyParser = require("body-parser");
  var router = express.Router();
	
	// VOICE ==================================================

  //==================================================
	router.post('/api/voice-data', function(req,res){
		console.log('req.body',req.body);
		
	});


	module.exports = router;
})();
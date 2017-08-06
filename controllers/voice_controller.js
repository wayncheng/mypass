"use strict";
(function() {
  var express = require("express");
  // var voiceIt = require("../models/voiceit.js");
  var bodyParser = require("body-parser");
  var router = express.Router();
  var myVoiceIt = require("VoiceIt");
	myVoiceIt.initialize(process.env.VOICEIT_DEV_ID);
	var placeholder = 'peanutbutter';

// USER FUNCTIONS //////////////////////////////////////////////////
	router.post('/api/voice/user', function(req,res){
		console.log('req.body',req.body);
		var username = req.body.username;
		console.log('creating voiceit user:',username);

		
		myVoiceIt.createUser({
			userId: username,
			password: placeholder,
			callback: function(response) {
				console.log("The Server Responded with the JSON: ", response);
				//ADD CUSTOM CODE HERE TO USE
				//DATA RECEIVED IN THE response VARIABLE
				res.send(response);
			}
		});
	});
	//==================================================
	router.get('/api/voice/user/:username', function(req,res){
		var username = req.params.username;
		console.log('getting voiceit user:',username);

		myVoiceIt.getUser({
			userId: username,
			password: placeholder,
			callback: function(response) {
				//ADD CUSTOM CODE HERE TO USE
				//DATA RECEIVED IN THE response VARIABLE
				console.log("The Server Responded with the JSON: ", response);
				res.send(response);
			}
		});
	});
	//==================================================
	router.delete('/api/voice/user', function(req,res){
		var username = req.body.username;
		console.log('deleting voiceit user:',username);

		myVoiceIt.deleteUser({
			userId: username,
			password: placeholder,
			callback: function(response) {
				//ADD CUSTOM CODE HERE TO USE
				//DATA RECEIVED IN THE response VARIABLE
				console.log("The Server Responded with the JSON: ", response);
			}
		});
	});

// ENROLLMENT //////////////////////////////////////////////////
	router.post('/api/voice/enroll', function(req,res){
		console.log('req.body',req.body);

		myVoiceIt.createEnrollmentByWavURL({
			userId: req.body.username,
			password: placeholder,
			urlToEnrollmentWav: req.body.blobURL + '.wav',
			contentLanguage: 'en-US',
			callback: function(response){
			console.log("The Response Was ",response);
			}
		});
	})
	//==================================================

// AUTHENTICATION //////////////////////////////////////////////////


//==================================================
  router.post("/api/voice-data", function(req, res) {
    console.log("req.body", req.body);
  });

  module.exports = router;
})();

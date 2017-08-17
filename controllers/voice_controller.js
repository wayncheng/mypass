"use strict";
(function() {
  var express = require("express");
  // var voiceIt = require("../models/voiceit.js");
  var bodyParser = require("body-parser");
  var router = express.Router();
  var myVoiceIt = require("VoiceIt");
	myVoiceIt.initialize(process.env.VOICEIT_DEV_ID);
	var placeholder = 'peanutbutter';


var fs = require('fs-extra');
    var multer  = require('multer');
	// var setupUpload = multer({ 
 //      dest: 'uploads/',
 //      limits: '5mb',
 //      filename: function (req, file, cb) {
 //        cb(null, Date.now() + '.wav') //Appending .jpg
 //      }
 //    });


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/audio/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.wav') //Appending .jpg
  }
})

var setupUpload = multer({ storage: storage });



// USER FUNCTIONS //////////////////////////////////////////////////
	router.post('/api/voice/user/:username', function(req,res){
		console.log('req.body',req.body);
		var username = req.params.username;
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
	router.delete('/api/voice/user/:username', function(req,res){
		var username = req.params.username;
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

	var userCreated = false;

// ENROLLMENT //////////////////////////////////////////////////
	router.post('/api/voice/enroll/:username', setupUpload.single('audio'), function(req,res){
		console.log("inside enrollll...");
		console.log('req.body',req.body);
		var username = req.params.username;

		if(req.file){
			console.log("Audio file received");
			console.log(req.file);

			var audioFilePath = __dirname + "/../uploads/audio/" + req.file.filename;
			console.log("audioFilePath === ",audioFilePath);

		// First create user in voice it and then enroll it...

		// myVoiceIt.createUser({
		// 	userId: username,
		// 	password: placeholder,
		// 	callback: function(response) {
		// 		console.log("The Server Responded with the JSON for create user: ", response);
		// 		var createUsrRes = JSON.parse(response);
		// 		if(createUsrRes.ResponseCode == "SUC"){
		// 			userCreated = true;
		// 		}
		// 		//ADD CUSTOM CODE HERE TO USE
		// 		//DATA RECEIVED IN THE response VARIABLE

				
				
		// 		// res.send(response);
		// 	}
		// });

		// if(userCreated){
			var result = enrollUser(username,audioFilePath,function(response){
					res.send(response);
				});
		// }

	// });
	}
		
	})
	//==================================================

// AUTHENTICATION //////////////////////////////////////////////////


//==================================================
  router.post("/api/voice/authenticate/:username", setupUpload.single('audio'), function(req, res) {
    console.log("inside voice authenticate..");
    var username = req.params.username;

		if(req.file){
			console.log("Audio file received");
			console.log(req.file);

			var audioFilePath = __dirname + "/../uploads/audio/" + req.file.filename;
			console.log("audioFilePath === ",audioFilePath);

    	myVoiceIt.authentication({
			userId: username,
			password: placeholder,
			pathToAuthenticationWav: audioFilePath,
			contentLanguage: 'en-US',
			callback: function(response){
				console.log("The Response Was ",response);
    			res.send(response);


			}
		});
    }
  });


  function enrollUser(username,filePath,cb){

  			myVoiceIt.createEnrollment({
					userId: username,
					password: placeholder,
					pathToEnrollmentWav:filePath,
					contentLanguage: 'en-US',
					callback: function(response){
						console.log("res : ",response);						
						return cb(response);

						// if(enrollRes.ResponseCode == "SUC" && enrollCount != 3){
						// 	enrollCount ++;
						// 	enrollUser(username,filePath);
						// }
						// if(enrollCount == 3 && enrollRes.ResponseCode == "SUC"){
						// 	
						// }
					}
				});
  }




  module.exports = router;
})();


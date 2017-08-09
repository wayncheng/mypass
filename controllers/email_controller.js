"use strict";

(function(){

  var express = require("express");
  var router = express.Router();
  var bodyParser = require("body-parser");


	var nodemailer = require('nodemailer');
	var smtpTransport = require('nodemailer-smtp-transport');
	var testEmail = "aqupriyanka@gmail.com";
	 

	router.post("/email",function(req,res){

		console.log("inside email controller");
		// var cookies = cookie.parse(req.headers.cookie || '');
 	// 	console.log("COOKIE EMAIL == ",cookies.email);
  // Get the visitor name set in the cookie 
  		// var name = cookies.email;
  		var bs = require('browser-storage');
		console.log("inside email controller email id === ",bs.getItem("email"));

		var emailAddress = bs.getItem("email");

		var transporter = nodemailer.createTransport(smtpTransport({
		service: 'Gmail',
        auth: {
            user: 'mypass.group@gmail.com', // Your email id
            pass: 'arora123' // Your password
        },
        rejectUnauthorized:false
	}));

		var mailOptions = {
			    from: 'mypass.group@gmail.com', // sender address
			    to: testEmail, // list of receivers
			    subject: 'Welcome To MyPass', // Subject line
			    text: 'Thank You for Signing On MyPass. Your credentials are :' //, // plaintext body
			    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
			};



		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.json({yo: info.response});
		    };
		});

	});

	
	module.exports = router;

})();
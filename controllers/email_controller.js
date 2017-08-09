"use strict";

(function(){

  var express = require("express");
  var router = express.Router();
  var bodyParser = require("body-parser");


	var nodemailer = require('nodemailer');
	var smtpTransport = require('nodemailer-smtp-transport');
	// var testEmail = "aqupriyanka@gmail.com";
	 

	router.post("/email/:username",function(req,res){

		console.log("inside email controller");
  		var bs = require('browser-storage');
		console.log("inside email controller email id === ",bs.getItem("email"));

		var emailAddress = bs.getItem("email");
		var username = req.params.username;

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
			    to: emailAddress, // list of receivers
			    subject: 'Welcome To MyPass', // Subject line
			    // text: 'Thank You for Signing On MyPass. Your credentials are :' //, // plaintext body
			    html: createMailBody(username)
			    // '<b>Welcome '+req.params.username + '</b>' // You can choose to send an HTML body instead
			};



		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        // res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.render("landing", {
				      title: "MyPass - Home",
				      welcome_message: "Congratulations!! You have Successfully Signed Up!"
				    });
		    };
		});

	});

	function createMailBody(username){

		var html = '<b>Welcome '+username + '</b>'
					+ '<br>'
					+ '<p> Thanks for registering at <a href="https://my-pass.herokuapp.com/">MyPass</a></p>'
					+ '<br><p>If You can want to integrate our biometric services, please email us at : mypass.group@gmail.com. </p>'
					+ '<br><p>We hope you enjoy using our Biometric services. </p>'
					+ '<br><br>'
					+ '<p>Enjoy! <br>MyPass Team</p>'

		return html;
	}
	
	module.exports = router;

})();
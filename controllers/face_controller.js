"use strict";
(function(){

	var express = require("express");
  	var router = express.Router();
  	var AWS = require('aws-sdk');
    var credentials = {accessKeyId: process.env.AMAZON_ACCESS_KEY,
                        secretAccessKey : process.env.AMAZON_SECRET_ACCESS_KEY};
    AWS.config.credentials = credentials;
    AWS.config.region = 'us-west-2';
    var rekognition = new AWS.Rekognition({region: AWS.config.region});
	var s3 = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET }});



//POST END POINT WHEN USER TRIES TO LOGIN
//** NEED TO ADD VALIDATIONS : 1. IMAGE DATA IS EMPTY
//**						   2. USERNAME IS NULL/EMPTY
//**						   3. NO FACE RECOGNIZE IN IMAGE
//CHANGE THE RETURN END POINT OR CHANGE IN JPEG-CAMERA.JS TO LOAD ANOTHER PAGE OR LOGIN INFORMATION
	router.post("/api/face/login/:username",function(req,res){
		var username = req.params.username;
		var response = "";
		var imageFound = false;
		req.on("data",function(data){
			console.log("DATA on DATA ----",data);

			rekognition.searchFacesByImage(
				{
					CollectionId: username,
					FaceMatchThreshold: 0,
					Image: {
						Bytes: data
					},
					MaxFaces: 1
				},
				function(err, data) {
					if (err) {
						// res.send(err);
						imageFound = false;
						response = err.message;
						if(err.code == 'ResourceNotFoundException'){
							// res.status(404);
							res.status(400);
        					return res.end(response);

						} //END OF ERROR IF LOOP
					} 
          			else {
            			console.log("DATA === ",data);
              			var similarity = data.FaceMatches[0].Similarity;
						if ( similarity >= 80 && data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face ) {
							response = "Welcome "+ username;
							imageFound = true;
							res.status(200);
        					return res.end(response);

              			} else{
              				response = "Access Denied. Face Similarity : "+similarity;
							imageFound = false;
							res.status(404);
        					return res.end(response);

              			}

       			 	} //END OF OUTER ELSE LOOP
    			});//END OF FUNCTION AND SEARCHfACEBYIMAGE METHOD

		});//END OF REQUEST ON DATA LOOP

		
	}); //END OF ENDPOINT LOOP



//POST IMAGE WHEN USER SIGNS UP
	router.post("/api/face/signup/:username",function(req,res){
		console.log("Inside face SignUp");
		var username = req.params.username;
		
		


		return res.end();
	});

	module.exports=router;

})();

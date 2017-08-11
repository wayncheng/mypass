"use strict";
(function(){

	var express = require("express");
  	var router = express.Router();
  	var AWS = require('aws-sdk');
    var credentials = {accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY};
    AWS.config.credentials = credentials;
    AWS.config.region = 'us-west-2';
    var rekognition = new AWS.Rekognition({region: AWS.config.region});
	var s3 = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET }});

	  
	var fs = require('fs-extra');
    var multer  = require('multer');
	var setupUpload = multer({ 
      dest: 'uploads/pics/',
      limits: '5mb',
      filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
      }
    });



//POST END POINT WHEN USER TRIES TO LOGIN
//** NEED TO ADD VALIDATIONS : 1. IMAGE DATA IS EMPTY
//**						   2. USERNAME IS NULL/EMPTY
//**						   3. NO FACE RECOGNIZE IN IMAGE
//CHANGE THE RETURN END POINT OR CHANGE IN JPEG-CAMERA.JS TO LOAD ANOTHER PAGE OR LOGIN INFORMATION
	router.post("/api/picture/login", setupUpload.single('image'), function(req,res){
		var username = req.body.username1;
		var response = "";
		var imageFound = false;
		// req.on("data",function(data){
			console.log("DATA on DATA ----",req.file.path);
			console.log("DATA on DATA ----",req.file.filename);
			var bitmap;

		if(req.file){
  			bitmap = fs.readFileSync(req.file.path);


			rekognition.searchFacesByImage(
				{
					CollectionId: username,
					FaceMatchThreshold: 0,
					Image: {
						Bytes: bitmap
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
			                return res.redirect("/loginSuccess/"+username);
        					// return res.end(response);

              			} else{
              				response = "Access Denied. Face Similarity : "+similarity;
							imageFound = false;
							res.status(404);
        					return res.end(response);

              			}

       			 	} //END OF OUTER ELSE LOOP
    			});//END OF FUNCTION AND SEARCHfACEBYIMAGE METHOD

		// });//END OF REQUEST ON DATA LOOP

		}
	}); //END OF ENDPOINT LOOP



//POST IMAGE WHEN USER SIGNS UP
//SIGNUP REQUIRES 2 STEPS--1. IT CREATES A COLLECTION WITH THE NAME OF USERNAME, 2.IT CREATES THE JSON FILE FOR THE IMAGE.S
	router.post("/api/picture/signup", setupUpload.single('image'), function(req,res){

		var username = req.body.username1;
		var response = "";
        // Index a dir of faces
        rekognition.createCollection({ CollectionId: username }, function(err, colData) {
          if (err) {
            console.log("createCollection error", err.message);
            if(err.code == "ResourceAlreadyExistsException"){
            	res.status(400);
            	return res.end(err.message);
            }
          } 
          else { // successful response
            console.log("createCollection success");
            console.log(colData);
			var bitmap;

			if(req.file){
  				bitmap = fs.readFileSync(req.file.path);
			        console.log("indexFaces...");
			        rekognition.indexFaces(
			            {
			              CollectionId: username,
			              DetectionAttributes: ["ALL"],
			              ExternalImageId: username,
			              Image: {
			                Bytes: bitmap
			              }
			            },
			            function(err, data) {
			              if (err) {
			                console.log("indexFaces error", err.message);
			              } else {
			                console.log("indexFaces success");
			                // console.log(data);           // successful response
			                fs.writeJson(__dirname+"/../uploads/pics/json/"+username + ".json", data, err => {
			                  if (err) return console.error(err);
			                });
			                res.status(200);
			                response="Successfully Signed up";
			                // Run index.js once import complete
			                // index_mod(user, porty);
			                res.render("landing", {
						      title: "MyPass - Home",
						      welcome_message: "Congratulations!! You have Successfully Signed Up!"
						    });

			              }
			            });
			    }//END OF REQUEST ON DATA

      	}
        });



		// return res.end();
	});

	module.exports=router;

})();

voiceControl("");

var mediaConstraints = {
  audio: true
};

sessionStorage.setItem("userCreated","false");
sessionStorage.removeItem("enrollCount");

var apiPhase = $("#apiPhase").text();
var enrollCount = 0;

<<<<<<< HEAD
var mediaRecorder;
function onMediaSuccess(stream) {
  mediaRecorder = new MediaStreamRecorder(stream);
  mediaRecorder.mimeType = "audio/wav"; // check this line for audio/wav
  mediaRecorder.recorderType = StereoAudioRecorder;
  mediaRecorder.audioChannels = 1;
  mediaRecorder.ondataavailable = function(blob) {
		mediaRecorder.stop();
    var blobURL = URL.createObjectURL(blob);
    // POST/PUT "Blob" using FormData/XHR2
    var fd = new FormData();
    fd.append("voice", blob);

  // $.ajax({
  //   type: 'POST',
  //   url: '/api/voice-data',
  //   data: fd,
  //   contentType: false,
  //   cache: false,
  //   processData: false,
  // }).done(function(r){
	// 	console.log('r',r);
	// })
    var oReq = new XMLHttpRequest();
		oReq.open("POST", "/api/voice-data", true);
		// oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.onload = function(oEvent) {
      if (oReq.status == 200) {
        console.log("uploaded");
      } else {
        console.log("error");
      }
    };
    oReq.send(fd);

    var player = document.getElementById("player");
    player.src = blobURL;
    console.log("blobURL", blobURL);
  };
  // mediaRecorder.start(3000);
=======
navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
var mediaRecorder;
function onMediaSuccess(stream) {
	console.log("inside onMediaSuccess...");
    mediaRecorder = new MediaStreamRecorder(stream);
	mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
	mediaRecorder.recorderType = StereoAudioRecorder;
	mediaRecorder.audioChannels = 1;
	//FUNCTION CALLED WHEN RECORDED DATA IS AVAILABLE
    mediaRecorder.ondataavailable = function (blob) {
		mediaRecorder.stop();
		$('#record').removeClass('pulse recording');
		Materialize.toast('Recording finished. Sending to server now.', 3000);
		voiceControl("Please wait");
		var username = $('#username').val().trim();
		console.log("username === ",username);
		console.log("API PHASE === ",apiPhase);
		var fileType = 'audio';
		var formData = new FormData();
		formData.append(fileType, blob, username+'.wav');
		

		
		var voiceItApiPhase = "";
		if(sessionStorage.getItem("enrollCount")){
			enrollCount = sessionStorage.getItem("enrollCount");
		}

		if(apiPhase == "signup"){	
			voiceItApiPhase = "enroll";
			console.log("sessionStorage.getItem(userCreated)",sessionStorage.getItem("userCreated"));
			if(sessionStorage.getItem("userCreated") === "false"){
				$.post("/api/voice/user/"+username,function(res,status){
					console.log("********User created in VoiceIt DB with username***********",username);
					if(JSON.parse(res).ResponseCode === "SUC"){
						sessionStorage.setItem("userCreated","true");
						sessionStorage.setItem("enrollCount","0");

						enrollOrAuthenticateUser(formData,voiceItApiPhase,username);

					} else{
						sessionStorage.setItem("userCreated","false");
					}

				});
			} else{
				enrollOrAuthenticateUser(formData,voiceItApiPhase,username);

			}


		} else if(apiPhase == "login"){
			voiceItApiPhase = "authenticate";
			enrollOrAuthenticateUser(formData,voiceItApiPhase,username);

		}


	}
    // mediaRecorder.start(3000);
>>>>>>> 807439641e0101cd503ebf80a0090e766d2013ec
}

function enrollOrAuthenticateUser(formData, voiceItApiPhase, username){
	$.ajax({
			type:"POST",
			url: "/api/voice/" + voiceItApiPhase + "/" +username,
			data: formData,
			// body:formData,
			processData: false,  // prevent jQuery from converting the data
			contentType: false
		}).done(function(res){
			console.log('res',res);
			// return res;

			if(voiceItApiPhase === "enroll"){
				console.log("inside 1st if of enroll");
				if(JSON.parse(res).ResponseCode === "SUC"){
					console.log("inside if response code == success");

					enrollCount++;
					sessionStorage.setItem("enrollCount",enrollCount);

					if(parseInt(enrollCount) < 3){
						console.log("inside if enrollCount <3");

						Materialize.toast("Please press Start Again for Next Enrollment",3000);
						voiceControl("");
					}
					if(parseInt(enrollCount) == 3){
						console.log("inside if enrollCount ==3");

						Materialize.toast("Successfully Signed Up",3000);
						sessionStorage.removeItem("enrollCount");
						window.location.replace(window.location.origin + "/email/"+username);
					}
				} else{
					console.log("inside if response code != success");
					console.log(JSON.parse(res).Result)
					$("#error").text(JSON.parse(res).Result);
					$("#error").append("Please try again");
					voiceControl("Please try again");
					voiceControl("");
					$("#error").css("color","red");
					$("#error").css("font-weight","bold");
					$("#error").css("font-size","bold");

				}
			} else if(voiceItApiPhase === "authenticate"){
				if(JSON.parse(res).ResponseCode === "SUC"){
					Materialize.toast("Welcome "+username+"\nYou have successfully Logged In. ",3000);
					voiceControl("Welcome "+username);
					window.location.replace(window.location.origin + "/loginSuccess/"+username);
				} else{
					Materialize.toast("Authentication Failed ",3000);
					$("#error").text("AUTHENTICATION FAILED.\nPlease Try Again");
					$("#error").css("color","red");
					$("#error").css("font-weight","bold");
				}


			}

		});
}

function onMediaError(e) {
  console.error("media error", e);
}
<<<<<<< HEAD

$("#start").on("click", function(e) {
  e.preventDefault();
  mediaRecorder.start(2 * 1000);
});
$("#stop").on("click", function(e) {
  e.preventDefault();
  mediaRecorder.stop();
});

$("#save").on("click", function(e) {
  e.preventDefault();
  mediaRecorder.save(YourExternalBlob, "FileName.wav");
});
=======
	



$('#record').on('click',function(e){
	e.preventDefault();
	$("#error").text("");
	var $t = $(this);
	$t.addClass('pulse recording');
	mediaRecorder.start(5000);
	Materialize.toast('Recording audio...',5000);
// 	$('#cancel-btnVoiceBefore').hide();
// 	$('#cancel-btnVoiceAfter').css('visibility','visible');
	

})
$('#stop').on('click',function(e){
	e.preventDefault();
	mediaRecorder.stop();

})

//==================================================
// check if user exists
$('#username').on('change',function(e){
	e.preventDefault();
	var username = $(this).val().trim();
	console.log("username ==== ",username);
	// voiceControl("Please Wait, while we are checking your username.");
	$.ajax({
		type: 'GET',
		url: '/api/voice/user/'+username
	}).done(function(res){
		console.log('res',res);
		var r = JSON.parse(res);
		var code = r.ResponseCode;
		console.log('code',code);

		if (code === 'UNF') {
			Materialize.toast(`${username} does not exist yet in VoiceIt's DB.`, 5000);
			$("#error").text(`${username} does not exist.`);
			$("#error").css("color","red");
			$("#error").css("font-weight","bold");
			$("#record").addClass("disable_a_href");
			// $("#record").removeAttr("href");
			// $("#keyboard_voice").addClass("disbaled");
		}
		else if (code === 'SUC'){
			// Materialize.toast(`${username} already exists.`, 5000)
			voiceControl("Please Press Mic Button And Say,  Today is a nice day to go for a walk.");
			$("#record").removeClass("disable_a_href");
			// $("#keyboard_voice").removeClass("disable_a_href");
			// $("#record").attr("href","#!");

		}
		else {
			Materialize.toast(res,5000);
		}
	})

})
>>>>>>> 807439641e0101cd503ebf80a0090e766d2013ec

///Delete VoiceIt user & DB & AWS
$('#cancel-btnVoice').on('click',function(event){
	event.preventDefault();	
	console.log(event)
	var username = $('#username').val().trim();
	window.location.href = "#/";
	var apiPhase = $("#apiPhase").text();

	if(apiPhase == "signup"){
		$.ajax({
			method: 'DELETE',
			url: '/api/delete/db/' + username
			}).done(function(res){
				console.log("DB / AWS Collection deleted");
			});
		$.ajax({
			url: '/api/voice/user/'+ username,
			dataType: "JSON",
			method: 'DELETE'
      		}).done(function(data){
      			console.log("VoiceIt User: "+username+" deleted");
    
		});

	}else if(apiPhase == "login"){	
		window.location.replace(window.location.origin+"/");
	}
});



<<<<<<< HEAD
//     processor.onaudioprocess = function(e){
//       // Do something with the data, i.e Convert this to WAV
//       console.log(e.inputBuffer);
// 		};

//     const options = {mimeType: 'video/webm;codecs=vp9'};
//     const recordedChunks = [];
//     const mediaRecorder = new MediaRecorder(stream, options);

//     mediaRecorder.addEventListener('dataavailable', function(e) {
//       if (e.data.size > 0) {
//         recordedChunks.push(e.data);
//       }

//       if(shouldStop === true && stopped === false) {
//         mediaRecorder.stop();
//         stopped = true;
//       }
//     });

//     mediaRecorder.addEventListener('stop', function() {
//       downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
//       downloadLink.download = 'acetest.wav';
//     });

//     mediaRecorder.start();
//   };

//   navigator.mediaDevices.getUserMedia({ audio: true, video: false })
//       .then(handleSuccess);
=======
/////Not in use	(Testing nested ajax calls)	
// function deleteDBandAWS(){ 
//     return $.ajax({
//         url: '/api/delete/db/'  + username,
//         method: 'DELETE'
        
//     });   
// }

// function deleteVoice(){ 
//     return $.ajax({
//         url: '/api/voice/user',
//         method: 'DELETE',
//     });   
// }

// function deleteAll() {
// 	window.location.href = "#/";
//     return deleteDBandAWS().then(deleteVoice);
// }





function voiceControl(text){
	var apiPhase = $("#apiPhase").text();

	if(text == "" && apiPhase == "signup" ){

		responsiveVoice.speak("Please Press Mic Button And Say,  Today is a nice day to go for a walk.");
	} else if(text == "" && apiPhase == "login" ){
		responsiveVoice.speak("Please enter your username below.");
	} 
	else{
		responsiveVoice.speak(text);

	}

}



//NOT IN USE CODE

// mediaRecorder.save(blob, '/uploads/test.wav');
				// var blobURL = URL.createObjectURL(blob);
				// console.log("BLOB URL ==== ",blobURL);
				// console.log('blobURL',blobURL);
				// document.getElementById('player').src = blobURL;
				// document.write('<a href="' + blobURL + '">' + blobURL + '</a>');

				// $.ajax({
				// 	type:"POST",
				// 	url: "/api/voice/" + voiceItApiPhase + "/" +username,
				// 	data: formData,
				// 	// body:formData,
				// 	processData: false,  // prevent jQuery from converting the data
    // 				contentType: false
				// }).done(function(res){
				// 	console.log('res',res);

				// 	if(voiceItApiPhase === "enroll"){
						
				// 		enrollCount++;
				// 		sessionStorage.setItem("enrollCount",enrollCount);

				// 		if(JSON.parse(res).ResponseCode == "SUC" && enrollCount < 3){
				// 			Materialize.toast("Please press Start Again for Next Enrollment",3000);
				// 		}
				// 		if(JSON.parse(res).ResponseCode == "SUC" && enrollCount == 3){
				// 			Materialize.toast("Successfully Signed Up",3000);
				// 		}
				// 	}

				// });
			// } else if(apiPhase == "login"){

			// 	$.ajax({
			// 		type:"POST",
			// 		url: "/api/voice/authenticate/"+username,
			// 		data: formData,
			// 		// {
			// 		// 	username: username,
			// 		// 	blobURL: blobURL
			// 		// },
			// 		body:formData,
			// 		processData: false,  // prevent jQuery from converting the data
   //  				contentType: false
			// 	}).done(function(res){
			// 		console.log('res',res);
			// 	});

			// }

				// document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
>>>>>>> 807439641e0101cd503ebf80a0090e766d2013ec

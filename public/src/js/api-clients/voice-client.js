voiceControl(null);

var mediaConstraints = {
    audio: true
};

sessionStorage.setItem("userCreated","false");
sessionStorage.removeItem("enrollCount");

var enrollCount = 0;

navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
var mediaRecorder;
function onMediaSuccess(stream) {
	console.log("inside onMediaSuccess...");
    mediaRecorder = new MediaStreamRecorder(stream);
		mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
		mediaRecorder.recorderType = StereoAudioRecorder;
		mediaRecorder.audioChannels = 1;
    mediaRecorder.ondataavailable = function (blob) {
				mediaRecorder.stop();
				$('#record').removeClass('pulse recording');
				Materialize.toast('Recording finished. Sending to server now.', 3000);
				voiceControl("Please wait");
				var username = $('#username').val().trim();

    			var apiPhase = $("#apiPhase").text();
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

		}
    // mediaRecorder.start(3000);
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
				
				enrollCount++;
				sessionStorage.setItem("enrollCount",enrollCount);

				if(JSON.parse(res).ResponseCode === "SUC" && parseInt(enrollCount) < 3){
					Materialize.toast("Please press Start Again for Next Enrollment",3000);
					voiceControl(null);
				}
				if(JSON.parse(res).ResponseCode === "SUC" && parseInt(enrollCount) == 3){
					Materialize.toast("Successfully Signed Up",3000);
					sessionStorage.removeItem("enrollCount");
					window.location.replace(window.location.origin + "/email/"+username);
					//disable start stop button & create user button
					//redirect to successful signup/login page & send an email
				}
			} else if(voiceItApiPhase === "authenticate" && JSON.parse(res).ResponseCode === "SUC"){
					Materialize.toast("Welcome "+username+"\nYou have successfully Logged In. ",3000);

			}

		});
}

function onMediaError(e) {
    console.error('media error', e);
}
	


$('#record').on('click',function(e){
	e.preventDefault();
	var $t = $(this);
	$t.addClass('pulse recording');
	mediaRecorder.start(5000);
	Materialize.toast('Recording audio...',5000);
})
$('#stop').on('click',function(e){
	e.preventDefault();
	mediaRecorder.stop();

})

//==================================================
// check if user exists
$('#username').on('change',function(e){
	console.log("inside username on change");
	e.preventDefault();
	var username = $(this).val().trim();
	console.log("username ==== ",username);
	$.ajax({
		type: 'GET',
		url: '/api/voice/user/'+username
	}).done(function(res){
		console.log('res',res);
		var r = JSON.parse(res);
		var code = r.ResponseCode;
		console.log('code',code);

		if (code === 'UNF') {
			Materialize.toast(`${username} does not exist yet in VoiceIt's DB.`, 5000)
		}
		else if (code === 'SUC'){
			// Materialize.toast(`${username} already exists.`, 5000)
			voiceControl("Please Press Start Button And Say,  Today is a nice day to go for a walk.");

		}
		else {
			Materialize.toast(res,5000);
		}
	})

})

function voiceControl(text){
	var apiPhase = $("#apiPhase").text();
	if(text == null && apiPhase == "signup" ){

		responsiveVoice.speak("Please Press Start Button And Say,  Today is a nice day to go for a walk.");
	} else{
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
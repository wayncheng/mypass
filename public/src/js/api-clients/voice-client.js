var mediaConstraints = {
    audio: true
};

navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
var mediaRecorder;
function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
		mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
		mediaRecorder.recorderType = StereoAudioRecorder;
		mediaRecorder.audioChannels = 1;
    mediaRecorder.ondataavailable = function (blob) {
				mediaRecorder.stop();
				Materialize.toast('Recording finished. Sending to server now.', 3000);
				var username = $('#username').val().trim();
			 
				// *******************************************************
				// I believe if you want to post the blob straight up,
				// you have to use this FormData, XHR2 method, but if you 
				// just want to send blobURL, ajax will work fine. 
				// -- Wayne
				// *******************************************************
        // POST/PUT "Blob" using FormData/XHR2
					// var fd = new FormData();   
					// fd.append('username', username);
					// fd.append('blob', blob);
					// var oReq = new XMLHttpRequest();
					// oReq.open("POST", '/api/voice/enroll', true);
					// oReq.onload = function(oEvent) {
					// 	if (oReq.status == 200) { console.log('uploaded'); }
					// 	else { console.log('error'); }
					// };
					// oReq.send(fd);

				var blobURL = URL.createObjectURL(blob);
				console.log('blobURL',blobURL);
				// document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
				// document.getElementById('player').src = blobURL;
		
				$.ajax({
					type:"POST",
					url: "/api/voice/enroll",
					data: {
						username: username,
						blobURL: blobURL
					}
				}).done(function(res){
					console.log('res',res);
				})
		}
    // mediaRecorder.start(3000);
}

function onMediaError(e) {
    console.error('media error', e);
}
	
$('#start').on('click',function(e){
	e.preventDefault();
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
	e.preventDefault();
	var username = $(this).val().trim();

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
			Materialize.toast(`${username} already exists.`, 5000)
		}
		else {
			Materialize.toast(res,5000);
		}
	})

})
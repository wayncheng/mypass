var mediaConstraints = {
    audio: true
};

navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

function onMediaSuccess(stream) {
    var mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
    mediaRecorder.ondataavailable = function (blob) {
        // POST/PUT "Blob" using FormData/XHR2
        var blobURL = URL.createObjectURL(blob);
        document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
    };
    // mediaRecorder.start(3000);
}

function onMediaError(e) {
    console.error('media error', e);
}
	
$('#start').on('click',function(e){
	e.preventDefault();
	mediaRecorder.start();
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

		if (res === 'UNF') {
			Materialize.toast(`${username} does not exist yet in VoiceIt's DB.`, 5000)
		}
		else if (res === 'SUC'){
			Materialize.toast(`${username} already exists.`, 5000)
		}
	})

})
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
$('#pause').on('click',function(e){
	e.preventDefault();
	mediaRecorder.pause();
})
$('#resume').on('click',function(e){
	e.preventDefault();
	mediaRecorder.resume();
})
$('#save').on('click',function(e){
	e.preventDefault();
mediaRecorder.save(YourExternalBlob, 'FileName.webm');
})

// let shouldStop = false;
//   let stopped = false;
//   const downloadLink = document.getElementById('download');
//   const stopButton = document.getElementById('stop');

//   stopButton.addEventListener('click', function() {
//     shouldStop = true;
//   })

//   var handleSuccess = function(stream) {

//     var context = new AudioContext();
//     var input = context.createMediaStreamSource(stream)
//     var processor = context.createScriptProcessor(1024,1,1);

//     source.connect(processor);
//     processor.connect(context.destination);

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

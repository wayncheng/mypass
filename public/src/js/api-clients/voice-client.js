var mediaConstraints = {
  audio: true
};

navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

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
}

function onMediaError(e) {
  console.error("media error", e);
}

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

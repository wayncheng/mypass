console.log("voice-client.js loaded");



//============================================================
// https://developers.google.com/web/fundamentals/native-hardware/recording-audio/#use_the_permissions_api_to_check_if_you_already_have_access

// Check/Ask for access to microphone
navigator.permissions.query({ name: "microphone" }).then(function(result) {
  if (result.state == "granted") {
    // Audio access approved!
		console.log("audio permissions granted");
		triggerSuccess();

  } else if (result.state == "prompt") {
    console.log("audio permissions prompt");
    //==========================================
    // Should prompt user for permission here //
		//==========================================
		triggerSuccess();

  } else if (result.state == "denied") {
    console.log("audio permissions denied");
    //=================================
    // Should handle rejection here. //
		//=================================
		prompt('audio permissions denied')
  }
  result.onchange = function() {
    console.log("result", result);
  };
});

//============================================================
function triggerSuccess() {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(handleSuccess);
}

//============================================================
// ACCESS RAW DATA FROM MIC
// https://developers.google.com/web/fundamentals/native-hardware/recording-audio/#access_the_raw_data_from_the_microphone

function handleSuccess(stream) {
  var context = new AudioContext();
  var input = context.createMediaStreamSource(stream);
  var processor = context.createScriptProcessor(1024, 1, 1);

  var recorder = document.getElementById("recorder");
  var player = document.getElementById("player");

  recorder.addEventListener("change", function(e) {
    var file = e.target.files[0];
    // Do something with the audio file.
    player.src = URL.createObjectURL(file);
  });

  if (window.URL) {
    player.src = window.URL.createObjectURL(stream);
  } else {
    player.src = stream;
  }

  source.connect(processor);
  processor.connect(context.destination);

  processor.onaudioprocess = function(e) {
    console.log("audio data outputing...");
    // Do something with the data, i.e Convert this to WAV
    console.log(e.inputBuffer);
  };
}
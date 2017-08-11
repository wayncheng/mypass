'use strict';
(function(){
  var myVoiceIt = require("VoiceIt");
  myVoiceIt.initialize(process.env.VOICEIT_DEV_ID);
	
var voiceIt = {
	createUser: function(username){
		myVoiceIt.createUser({
			userId: username,
			password: "peanutbutter",
			callback: function(response) {
				//ADD CUSTOM CODE HERE TO USE
				//DATA RECEIVED IN THE response VARIABLE
				console.log("The Server Responded with the JSON: ", response);
			}
		});
	},
	getUser: function(username){
		myVoiceIt.getUser({
			userId: username,
			password: 'd0CHipUXOk',
			callback: function(response){
			//ADD CUSTOM CODE HERE TO USE
			//DATA RECEIVED IN THE response VARIABLE
			console.log("The Server Responded with the JSON: ",response);
			}
		});
	}
}

module.exports = voiceIt;
})();

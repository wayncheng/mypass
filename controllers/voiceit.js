'use strict';
(function(){
  var myVoiceIt = require("VoiceIt");
  myVoiceIt.initialize('ff699869470046d193b786ba8f1d1d7b')//process.env.VOICEIT_DEV_ID);
	
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
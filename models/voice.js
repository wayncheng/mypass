"use strict";
(function() {
  var msRestAzure = require("ms-rest-azure");
  var cognitiveServicesManagementClient = require("azure-arm-cognitiveservices");
  var subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

var request = require('request'),
    xmlbuilder = require('xmlbuilder'),
    wav = require('wav'),
		Speaker = require('speaker');
		
  msRestAzure
    .interactiveLogin()
    .then(credentials => {
      var cognitiveServicesClient = new cognitiveServicesManagementClient(
        credentials,
        subscriptionId
      );
      return cognitiveServicesClient.cognitiveServicesAccounts.list();
    })
    .then(cognitiveServicesAccounts => {
      console.log("List of accounts:");
      console.dir(cognitiveServicesAccounts, { depth: null, colors: true });
    });



exports.Synthesize = function Synthesize(){

		var apiKey = process.env.AZURE_SPEAKER_RECOGNITION_KEY1;
		
    request.post({
    	url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
			headers: {
					'Ocp-Apim-Subscription-Key' : apiKey
			},
			body: voiceData
    }, function(err,res){
			if (err) throw err;

			console.log('res',res);
		}
};
})();

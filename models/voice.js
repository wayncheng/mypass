"use strict";
(function() {
  var msRestAzure = require("ms-rest-azure");
  var cognitiveServicesManagementClient = require("azure-arm-cognitiveservices");

  var subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

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
})();

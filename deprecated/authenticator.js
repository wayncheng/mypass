"use strict";
(function() {
  var google_authenticator = require("authenticator");


  // google_authenticator.verifyToken(formattedKey, "000 000");
  // null

  // google_authenticator.generateTotpUri(
  //   formattedKey,
  //   "john.doe@email.com",
  //   "ACME Co",
  //   "SHA1",
  //   6,
  //   30
	// );





	
var authenticator = {
		generateKey: function(){
			var formattedKey = google_authenticator.generateKey();
			// "acqo ua72 d3yf a4e5 uorx ztkh j2xl 3wiz"
		},
		generateToken: function(){
			  var formattedToken = google_authenticator.generateToken(formattedKey);
				// "957 124"
		},
		verify: function(formattedKey, formattedToken){
			google_authenticator.verifyToken(formattedKey, formattedToken);
			// { delta: 0 }
		},
		generateQR: function(){
			generateTotpUri(formattedKey, accountName, issuer, algorithm, digits, period);
		}
	}
})();

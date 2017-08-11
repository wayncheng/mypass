console.log('face-client.js loaded');

$('#cancel-btnFace').on('click',function(event){
	event.preventDefault();	
	var username = $('#username').val().trim();
	window.location.href = "#/";
	var apiPhase = $("#apiPhase").text();

	if(apiPhase == "signup"){
		$.ajax({
			method: 'DELETE',
			url: '/api/delete/db/' + username
		}).done(function(res){
			console.log("DB delete at face step: success")
				
		});
	} else if(apiPhase == "login"){
		window.location.replace(window.location.origin+"/");
	}


});




// VOICE HANDLEBAR THERE WILL 1 MORE CANCEL BUTTON -- NAME IT DIFF
// ON CLICK OF THIS BUTTON, CALL
//1.DELETE VOICEIT USER --- CALL DELETE ROUTE IN VOICE_CONTROLLER.JS
//2.DELETE REKOGNITION COLLECTION --- CREATE A NEW ROUTE TO DELETE FROM REKOGNITION
//3. DELETE FROM OUR DB
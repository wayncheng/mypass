console.log('face-client.js loaded');

$('#cancel-btnFace').on('click',function(event){
	event.preventDefault();	
	console.log(event);
	
	
	var username = $('#username').val().trim();
	console.log(username)

	$.ajax({
		method: 'DELETE',
		url: '/api/face/signup/delete/' + username
	}).done(function(res){
		console.log("DB delete: success")
		//CALL AJAX CALL TO DELETE FRO REKOGNITION COLLECTION
		$.ajax({
		  method: 'POST',
		  url: '/api/delete/'+ username
		}).done(function(res){
			console.log("REKOGNITION delete: success")
		})

		
		
	})

});


// VOICE HANDLEBAR THERE WILL 1 MORE CANCEL BUTTON -- NAME IT DIFF
// ON CLICK OF THIS BUTTON, CALL
//1.DELETE VOICEIT USER --- CALL DELETE ROUTE IN VOICE_CONTROLLER.JS
//2.DELETE REKOGNITION COLLECTION --- CREATE A NEW ROUTE TO DELETE FROM REKOGNITION
//3. DELETE FROM OUR DB
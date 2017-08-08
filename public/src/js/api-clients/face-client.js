console.log('face-client.js loaded');

$('.cancel-btnFace').on('submit',function(event){
	
	
	var usernameVal = $('#username').val().trim();
	console.log(username)

	$.ajax({
		type: 'POST',
		url: '/api/face/signup/delete/' + usernameVal
	}).done(function(res){
		console.log("success")
		
	})

});

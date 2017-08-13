console.log('text-client.js loaded');

var isSignup = $('html').hasClass('signup');

if (isSignup){

}

// Basic validation during signup
//==================================================

// Username validation
// Rules:
// 1. Must be between 4-32 characters long
// 2. Can only contain alphanumeric or '_'
// 3. Cannot start with '_'
// 4. No spaces

// $('#username').on('change',function(e){
// 	e.preventDefault();
// 	var $t = $(this);
// 	var v = $(this).val().trim();
// 	// Remove invalid tag initially. If anything is invalid, it gets added back on.
// 	// If everything is valid, nothing changes.
// 	// $t.prop('invalid',false);
// 	$t.removeClass('invalid');
// 	$t.removeClass('valid');


// 	// Check username length
// 	if ( (v.length < 5) || (v.length > 32) ) {
// 		Materialize.toast('Invalid username. Must be between 5-32 characters.', 3000);
// 		// $t.prop('invalid',true);
// 		$t.addClass('invalid');
// 		return;
// 	}
// 	// Check if alphanumeric and underscores only
// 	if ( !v.match(/^[a-zA-Z0-9]*$/g) ){
// 		Materialize.toast('Invalid username. Can only contain alphanumeric characters and underscores (a-z,0-9)',3000);
// 		// $t.prop('invalid',true);
// 		$t.addClass('invalid');
// 		return;
// 	}

// 	//  Check if starts with underscore
// 	// if (v[0] === '_') {
// 	// 	Materialize.toast('Invalid username. Cannot start with _',4000);
// 	// 	// $t.prop('invalid',true);
// 	// 	$t.addClass('invalid');
// 	// 	return;
// 	// }

// 	$t.addClass('valid');

// })
$('#email').on('change',function(e){
	e.preventDefault();
	var $t = $(this);
	var v = $t.val().trim();
	var split = v.split('@');

	// Remove invalid tag initially. If anything is invalid, it gets added back on.
	// If everything is valid, nothing changes.
	$t.removeClass('invalid');
	$t.removeClass('valid');

	if (split.length !== 2){
		Materialize.toast('Invalid email. Please check the email you entered is correct.',3000);
		// $t.prop('invalid',true);
		$t.addClass('invalid');
		return;
	}

	$t.addClass('valid');
})
// Check if passwords match
// $('#confirm-password').on('change', function(e){
// 	e.preventDefault();
// 	$fields = $('.pw');
	
// 	$fields.removeClass('invalid');
// 	$fields.removeClass('valid');

// 	var pw1 = $('#password').val().trim();
// 	var pw2 = $('#confirm-password').val().trim();

// 	if (pw1 === pw2) {
// 		$fields.addClass('valid');
// 	}
// 	else {
// 		$fields.addClass('invalid');
// 		Materialize.toast('Passwords do not match', 4000);
// 	}


// })


// // Toggle password visibility
// // -- on mousedown, changes it to text, so it's visible
// // -- on mouseup, reset type to original (password), which hides it again
// $('.view-password').on('mousedown',function(e){
// 	e.preventDefault();
// 	$(this).siblings('.pw').attr('type','text');
// 	// $('.pw').attr('type','text');
// })
// $('.view-password').on('mouseup',function(e){
// 	e.preventDefault();
// 	$(this).siblings('.pw').attr('type','password');
// 	// $('.pw').attr('type','password');
// })

$('#cancel-btnText').on('click',function(event){
	event.preventDefault();
	var apiPhase = $("#apiPhase").text();
	
	if(apiPhase == "signup"){
		window.location.href = "#/";
	}else if(apiPhase == "login"){	
		window.location.replace(window.location.origin+"/login/text/");
	}
	
});
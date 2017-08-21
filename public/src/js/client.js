// var $h = $(html);
// var $w = $(window)

// Flag details using boswer
//==================================================
	if (bowser.mobile || bowser.tablet) {
		$('html').addClass('mobile');
	}

// Basic validation during signup
//==================================================

// Username validation
// Rules:
// 1. Must be between 4-32 characters long
// 2. Can only contain alphanumeric or '_'
// 3. Cannot start with '_'
// 4. No spaces
var invalidUnameError = "";
var invalidPwdError = "";

var errors = [];
$('#username.signup').on('change',function(e){
	e.preventDefault();
	console.log("inside uid.signup");
	invalidUnameError = validateUsername();
	Materialize.toast(invalidUnameError, 4000);


});

function validateUsername(){
	var invalidUnameError = "";
	var $t = $("#username.signup");
	var v = $("#username.signup").val().trim();

	$t.removeClass('invalid');
	$t.removeClass('valid');
	$("#create-act-btn").removeClass("disabled");

	// Check username length
	if ( (v.length < 5) || (v.length > 36) ) {
		invalidUnameError = 'Invalid username. Must be between 5-36 characters.';
		$t.addClass('invalid');
		return invalidUnameError;
	}
	// Check if alphanumeric and underscores only
	if ( !v.match(/^[a-zA-Z0-9]*$/g) ){
		invalidUnameError = 'Invalid username. Can only contain alphanumeric characters (a-z,0-9)';
		$t.addClass('invalid');
		return invalidUnameError;
	}

	//  Check if starts with underscore
	if (v[0] === '_') {
		invalidUnameError = 'Invalid username. Cannot start with _';
		$t.addClass('invalid');
		return invalidUnameError;
	}

	checkUserExists(function(data){
		if(data != null){
			Materialize.toast('Username Already Taken',4000);
			$t.addClass('invalid');
			$("#create-act-btn").addClass("disabled");
			// return "Username Already Taken";	
		} 
	}) 	

	$t.addClass('valid');
	// return invalidUnameError;

}

// Check if passwords match
$('#confirm-password').on('change', function(e){
	e.preventDefault();
	validatePassword();

});

function validatePassword(){
	invalidPwdError = "";
	$fields = $('.pw');
	
	$fields.removeClass('invalid');
	$fields.removeClass('valid');

	var pw1 = $('#password').val().trim();
	var pw2 = $('#confirm-password').val().trim();

	if (pw1 === pw2) {
		$fields.addClass('valid');

	}
	else {
		invalidPwdError='Passwords do not match';
		$fields.addClass('invalid');
		Materialize.toast(invalidPwdError, 4000);
	}

	return invalidPwdError;

}

$("#create-act-btn").on("click",function(e){
	e.preventDefault();
	invalidUnameError = validateUsername();
	invalidPwdError = validatePassword();


	if(invalidUnameError == "" && invalidPwdError == "" 
		|| invalidUnameError == undefined && invalidPwdError == ""){
		responsiveVoice.speak("Step 1 Completed");
		$("#formValidate").submit();
	} 
	else{
		if(invalidPwdError != "")
			Materialize.toast(invalidPwdError, 4000);
		if(validateUsername != "")
			Materialize.toast(invalidUnameError, 4000);

	}
});



// Toggle password visibility
// -- on mousedown, changes it to text, so it's visible
// -- on mouseup, reset type to original (password), which hides it again
$('#view-password').on('mousedown',function(e){
	e.preventDefault();
	$('.pw').attr('type','text');
})
$('#view-password').on('mouseup',function(e){
	e.preventDefault();
	$('.pw').attr('type','password');
})

function checkUserExists(cb){
	console.log("inside check user");
	var username = $("#username.signup").val().trim();
	var $t = $("#username.signup");
	$.get("/api/text/find/"+username,function(data,status){
			return cb(data);
	})
}


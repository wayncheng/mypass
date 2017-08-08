console.log('text-client.js loaded');


$("#create_btn").on("click",function(){
	console.log("create account button clicked");
	var username = $("#username").val().trim();
	console.log("USERNAME === ",username);
	sessionStorage.setItem("username",username);
});

'use strict';
(function(){
function route(app){
	app.get('/', function(req, res) {
		res.render("home", {title: "MyPass"});
	});
	
	app.get('/boop', function(req, res) {
		res.render("home", {title: "boop"});
	});

}


module.exports = route;
})();
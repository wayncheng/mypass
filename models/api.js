'use strict';
(function(){
var orm = require('../config/orm.js');
var table = "users";
var bcrypt = require("bcryptjs");
var saltRounds = 10;

var auth = {
  all: function(cb) {
    orm.all(table, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create(table, cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update(table, objColVals, condition, function(res) {
      cb(res);
    });
	},
	get_pw: function(username, attempt, cb){
		orm.get_pw(table, username, function(res){
			// get the password hash for this user from the database
			var hash = res[0].pw;

			// compare login attempt (in plain text) with the hash stored in the db.
			// returns bool
			bcrypt.compare(attempt,hash,function(err,res){
				cb(res);
			})
		})
	}
};


module.exports = auth;
})();
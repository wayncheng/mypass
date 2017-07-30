'use strict';
(function(){
var orm = require('../config/orm.js');
var table = "users";

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
	get_pw: function(username, cb){
		orm.get_pw(table,username, function(res){
			cb(res);
		} )
	}
};


module.exports = auth;
})();
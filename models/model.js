"use strict";
(function() {
  var orm = require("../config/orm.js"); // import ORM
  var table = "users";

  var model = {
    // all ==================================================
    all: function(cb) {
      orm.all(table, function(res) {
        cb(res);
      });
    },
    // create ==================================================
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
      orm.create("column_name", cols, vals, function(res) {
        cb(res);
      });
    },
    // update ==================================================
    update: function(objColVals, condition, cb) {
      orm.update("column_name", objColVals, condition, function(res) {
        cb(res);
      });
    },

    // remove ==================================================
    remove: function(objColVals, condition, cb) {
      orm.remove("column_name", objColVals, condition, function(res) {
        cb(res);
      });
    }
  };

  ////////////////////////////////////////////////////
  module.exports = model;
})();

"use strict";
(function() {
  // Import MySQL connection.
  var connection = require("../config/connection.js");

  var orm = {
    //==================================================
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    //==================================================
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;

      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";

      console.log(queryString);

      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    //==================================================
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;

      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      });
    },
    //==================================================
    remove: function(table, objColVals, condition, cb) {
      // var queryString = `DELETE FROM ${table} WHERE ${col} = ${target};`;
      var queryString = `DELETE FROM ${table} WHERE ${condition};`;
      console.log(queryString);

      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    //==================================================
    get_pw: function(table, username, cb) {
      // var queryString = `DELETE FROM ${table} WHERE ${col} = ${target};`;
      var queryString = `SELECT pw FROM ${table} WHERE username = "${username}";`;
      console.log(queryString);

      connection.query(queryString, function(err, result) {
        if (err) { throw err; }
        cb(result);
      });
    }
    //==================================================
  };
  module.exports = orm;

//==================================================
  // Helper function for SQL syntax.
  function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  // Helper function for SQL syntax.
  function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
      if (Object.hasOwnProperty.call(ob, key)) {
        arr.push(key + "=" + ob[key]);
      }
    }
    return arr.toString();
  }
//==================================================
})();

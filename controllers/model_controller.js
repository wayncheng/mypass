// blah1 is the column name/ name attr in html
"use strict";
(function() {
  var express = require("express");
  var router = express.Router();
  var bodyParser = require("body-parser");
  // var model = require("../models/model.js");
  //==================================================
  router.get("/signup/:authtype/:username?", function(req, res) {
    var authtype = req.params.authtype;
    var username = "";

    // if (authtype) {
      if (req.params.username) {
        username = req.params.username;
      }

      if (authtype === "done") {
        res.redirect("/verified");
      }

      var hbsParams = {
        title: "signup " + authtype,
        authtype: authtype,
        api_phase: "signup",
        layout: "signup",
        isSignup: true,
        username: username
      };
      hbsParams[authtype] = true;

      res.render(authtype, hbsParams);
    // }
  });
  router.get("/signup", function(req, res) {
    res.redirect("/signup/text");
  });
  router.get("/login/:authtype/:username?", function(req, res) {
    var authtype = req.params.authtype;
    var username = req.body.username;
    if (req.params.username) {
      username = req.params.username;
    }
    console.log("Username On Login Page == ", username);

    var hbsParams = {
      title: "login " + authtype,
      authtype: authtype,
      api_phase: "login",
      layout: "login",
      isSignup: false,
      username: username
    };
    hbsParams[authtype] = true;
    if (req.query.error) {
      res.render(authtype, { hbsParams: hbsParams, error: req.query.error });
    } else {
      res.render(authtype, hbsParams);
    }
  });
  router.get("/login", function(req, res) {
    res.redirect("/login/text");
  });
  //==================================================
  router.get("/verified", function(req, res) {
    res.render("verified", {
      title: "Verified Area"
    });
  });
  //==================================================
  router.get("/sitemap", function(req, res) {
    res.render("sitemap", {
      title: "Site Map"
    });
  });
  //==================================================
  router.get("/loginSuccess/:username", function(req, res) {
    res.render("landing", {
      title: "MyPass - Home",
      welcome_message: "Welcome " + req.params.username,
      userLoggedIn: true
    });
  });
  //==================================================
  router.get("/test", function(req, res) {
    res.render("test");
  });
  //==================================================
  router.get("/how-it-works", function(req, res) {
    res.render("tech-overview", {
      title: "MyPass - How It Works"
    });
  });
  //==================================================
  router.get("/future-plans", function(req, res) {
    res.render("future-plans", {
      title: "MyPass - Future Plans"
    });
  });
  //==================================================
  router.get("/about-us", function(req, res) {
    res.render("about-us", {
      title: "MyPass - About the Team"
    });
  });
  //==================================================
  router.get("/", function(req, res) {
    res.render("landing", {
      title: "MyPass - Home"
    });
  });

  //==================================================
  module.exports = router; // Export routes for server.js to use.
  ////////////////////////////////////////////////////
})();

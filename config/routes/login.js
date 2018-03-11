const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

var User = require("../models/user");

passport.use(new LocalStrategy(
	function(username, password, done) {
		// console.log(username, password, "Within LocalStrategy");
		User.getUserName(username, function(err, user) {
			if (err) throw err;
			if (!user) {
				// Ideal to indicate "one OR other", to prevent confirmation of either
				return done(null, false, {message: "Invalid user or password"} );
			}

			User.passWord(password, user.password, function(err, match) {
				if (err) throw err;
				if (match) {
					return done(null, user);
				} else {
					return done(null, false, {message: "Invalid user or password"} );
				};
			});
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findUserById(id, function(err, user) {
    done(err, user);
  });
});

// Works
router.post("/login", passport.authenticate("local",{ successRedirect: '/success', failureRedirect: '/fail', failureFlash: true }),
	function(req,res){
	console.log("Hit");
	}
);

router.get("/success",  (req, res) => {
	console.log("Success route");
	if (req.isAuthenticated()) {
		// console.log("Logged in, send JSON content");
		res.json("true");
	} else {
		// console.log("Login failed, do nothing");
		res.json("false");
	}
});

router.get("/fail",  (req, res) => {
	console.log("Fail route");
});

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "Logout successful");
	if (req.isAuthenticated()) {
		// console.log("Still logged in");
		res.json("true");
	} else {
		// console.log("Logged out");
		res.json("false");
	}
});

// Save hashed passwords
/*
router.get("/hash", (req, res) => {

	User.find().exec(function(err,doc){
		for (let i = 0; i < doc.length; i++) {
			// Adapted from https://glot.io/snippets/e798yzwe6n
			var salt = bcrypt.genSaltSync(5);
			console.log(salt);
			var hash = bcrypt.hashSync(doc[i].password, salt);
			console.log(doc[i].password, hash);
			User.findOneAndUpdate({_id: doc[i]._id}, {"$set":{"password":hash}}, { new: true }, (err, doc) => {
				if (err) throw err;
				console.log(doc);
			});
		}
	});
});
*/

module.exports = router;

// Require Mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Require Bcrypt program for password check
const bcrypt = require('bcryptjs');

// Create Month schema
var UserSchema = new Schema({
	username: String,
	password: String,
	lastLogin: Date
});

var User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserName = function(username, cb){
	var query = {username: username};
	User.findOne(query, cb);
}

module.exports.passWord = function(passW, value, cb) {
	bcrypt.compare(passW, value, (err, res) => { // compares regular pw to hashed value in DB
		console.log(res); // true or false
		if (res) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	});
}

module.exports.findUserById = function(id, callback) {
	User.findById(id, callback);
}

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('flash');
var session = require('express-session');

// Uncomment when ready to require
// var Keys = require("./keys.js");

// Determine which Mongoose connection to use
const PORT = process.env.PORT || 3000;

var Promise = require("bluebird");
mongoose.Promise = Promise;

// Initialize Express
var app = express();

require("./webpack.config.js");

// Use morgan and body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
	errorFormatter: function(param, mssg, value) {
		var namespace = param.split('.');
		var root = namespace.shift();
		var formParam = root;
		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			mssg: mssg,
			value: value
		};
	}
}));

// flash() Must precede route references
app.use(flash());

const months = require("./config/routes/months");
app.use("/", months);
const update = require("./config/routes/update");
app.use("/", update);
const login = require("./config/routes/login");
app.use("/", login);

app.use(cookieParser);

app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

var databaseUri = "mongodb://localhost/calendartheme";

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(databaseUri);
}

var db = mongoose.connection;
db.on("error", function(error){ console.log("Mongoose error:", error); });
db.once("open", function(){ console.log("Mongoose connection successful"); });

app.listen(PORT, function(){ console.log("App running on PORT", PORT); });

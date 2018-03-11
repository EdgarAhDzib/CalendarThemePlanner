const express = require("express");
const router = express.Router();

var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Month = require("../models/month.js");

var Promise = require("bluebird");
mongoose.Promise = Promise;

// Initialize Express
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

mongoose.connect("mongodb://localhost/calendartheme");

var db = mongoose.connection;
db.on("error", function(err){
	console.log("Mongoose error: ", err);
});
db.once("open", function(){
	console.log("Mongoose connection successful");
});
/*
// The Month model
{
	ordinal: Number,
	monthName: String,
	theme: String,
	powers: String,
	poses: String,
	suit: String,
	effects: String
}
*/

var allMonths = [
	{
		ordinal: 1,
		monthName: "January",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 2,
		monthName: "February",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 3,
		monthName: "March",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 4,
		monthName: "April",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 5,
		monthName: "May",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 6,
		monthName: "June",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 7,
		monthName: "July",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 8,
		monthName: "August",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 9,
		monthName: "September",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 10,
		monthName: "October",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 11,
		monthName: "November",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	},
	{
		ordinal: 12,
		monthName: "December",
		theme: "",
		powers: "",
		poses: "",
		suit: "",
		effects: ""
	}
];

for (let i = 0; i < allMonths.length; i++) {
	var entry = new Month(allMonths[i]);
	entry.save(function(err, doc){
		if (err) { console.log(err); }
		else { console.log(doc); }
	});
}

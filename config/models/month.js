// Require Mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Month schema
var MonthSchema = new Schema({
	ordinal: Number,
	monthName: String,
	theme: String,
	powers: String,
	poses: String,
	suit: String,
	effects: String
});
// powers, poses, suit, and effects were formerly Arrays

var Month = mongoose.model("Month", MonthSchema);

module.exports = Month;

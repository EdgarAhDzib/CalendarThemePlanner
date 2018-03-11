const express = require("express");
const router = express.Router();
var Month = require("../models/month");

router.post("/updateMonths", (req, res) => {
	// console.log(req.body);
	if (req.isAuthenticated()) {
		// console.log("Logged in, will update");
		for (var i in req.body.body) {
			// findOneAndUpdate by ordinal
			Month.findOneAndUpdate({ordinal:req.body.body[i].ordinal}, req.body.body[i]).exec(function(err,doc){
				if (err) { console.log(err); }
			});
		}
		res.json("true");
	} else {
		// console.log("Not logged in, don't update");
		res.json("false");
	}
});

module.exports = router;

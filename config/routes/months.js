const express = require("express");
const router = express.Router();
var Month = require("../models/month");

router.get("/allmonths", (req, res) => {
	Month.find({}).sort({"ordinal":1}).exec(function(err,doc){
		res.json(doc);
	});
});

module.exports = router;

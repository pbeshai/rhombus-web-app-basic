module.exports = {
	initialize: initialize
};

var fs = require('fs'),
	_ = require('lodash'),
	logger = require("../../log/logger");

function initialize(site) {
	// site.post("/api/apps/someApp/log", someAppResults);
}

function z(str) { // add leading zero
	return ("0"+str).slice(-2);
}

function filenameFormat(date) {
	return date.getFullYear()+z(date.getMonth()+1)+z(date.getDate())+"_"+z(date.getHours())+z(date.getMinutes())+z(date.getSeconds());
}

function someAppResults(req, res) {
	var now = new Date();
	var results = req.body.results;
	var config = req.body.config;
	var version = req.body.version;
	var flags = req.body.flags;

	var stream = fs.createWriteStream("log/someApp/results." + filenameFormat(now) + ".csv");
	stream.once('open', function(fd) {
		function output (str) {
			logger.info(str);
			stream.write(str + "\n");
		}
		output("Results output");

		// close the file and send 200 OK HTTP message
		stream.end();
		res.send(200);
	});
}
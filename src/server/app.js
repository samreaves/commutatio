/**
 * @name Commutatio Server
 * @file app.js
 * @description Initializes server. 
 * @author Sam Reaves
 * @date October 30th, 2015
 */

// Import Express and initialize server.
var express = require('express'),
	app = module.exports.app = exports.app = express(),
	logger = require('morgan'),
	path = require('path'),
	body_parser = require('body-parser'),
	server,
	host,
	port,
	static_directory = path.join(__dirname, '../client/');
 

// Use body parser to parse both application/json and application/x-www-form-urlencoded
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

// Use Morgan logger
app.use(logger('dev'));

// Establish static directory at client/public
app.use(express.static(static_directory));

// Route handler for root - sends current static landing page
app.get('/', function(req, res) {
  res.sendFile(path.join(static_directory, "index.html"));
});

// Server starts listening on port 3000.
server = app.listen(8000, function() {

	host = server.address().address,
  	port = server.address().port;

  	// Logs a message to let dev know we're up and running.
  	console.log('Example app listening at http://%s:%s', host, port);
});
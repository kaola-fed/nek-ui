#!/usr/bin/env node

var formidable = require('formidable');
var express = require('express');
var app = express();

app.use(express.static('doc'));

var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening on %s:%d', host, port);
});

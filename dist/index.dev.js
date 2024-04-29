"use strict";

var http = require('http');

var express = require('express');

var app = require('./app');

var _require = require('./config/keys'),
    port = _require.port;

app.use(express.urlencoded({
  extended: true
})); //create server

var server = http.createServer(app); //listen server

server.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
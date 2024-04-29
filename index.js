const http = require('http');
const express = require('express');
const app = require('./app');
const { port } = require('./config/keys');
app.use(express.urlencoded({ extended: true }));
//create server
const server = http.createServer(app);



//listen server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
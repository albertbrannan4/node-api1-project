// BUILD YOUR SERVER HERE
const express = require("express");
const model = require("./users/model");
const server = express();

//Global middleware
server.use(express.json());

module.exports = server; // EXPORT YOUR SERVER instead of {}

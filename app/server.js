var connect = require('connect');
var http = require('http');
var express  = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require('morgan');
var mongoose = require('mongoose');   

var app = express();




var port = 3000;
app.listen(port);
console.log("App listening on port " + port);


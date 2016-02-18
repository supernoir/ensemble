// -----------------------------------------------------------------------------  
//  SETUP
// -----------------------------------------------------------------------------

var connect = require('connect');
var http = require('http');
var express  = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require('morgan');
var mongoose = require('mongoose');   
var app = express();

// -----------------------------------------------------------------------------  
//  CONFIGURATION
// -----------------------------------------------------------------------------

mongoose.connect('mongodb://localhost/library');
app.use(express.static(__dirname + '/app'));         

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setting up views
// app.set('views', './views')
// app.set('view engine', 'jade');

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");  
  next();      
});

// -----------------------------------------------------------------------------  
//  MONGOOSE MODELS
// -----------------------------------------------------------------------------

var Characters = mongoose.model('Characters', {
    first_name : String,
    middle_name : String,
    last_name : String, 
    gender : String,
    origin : String,
    birthday : Date
});

// -----------------------------------------------------------------------------  
//  REST API
// -----------------------------------------------------------------------------

app.get('/characters', function(request, response) {
        Characters.find(function(error, characters) {
            if (error)
                response.send(error)
            response.json(characters);
        });
    });

app.post("/characters", function(request, response, next) {
    var character = new Characters();
        character.first_name = request.body.first_name;
        character.last_name = request.body.last_name;
        character.origin = request.body.origin;

    character.save(function(error, character) {
        if (error) { return next(error) }
        response.json({ message: 'Character added!', data: character });
       
    });
});


// -----------------------------------------------------------------------------  
//  LISTENING
// -----------------------------------------------------------------------------

var port = 3000;
app.listen(port);
console.log("App listening on port " + port);


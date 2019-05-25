// -----------------------------------------------------------------------------
//  SETUP
// -----------------------------------------------------------------------------

const port = process.env.PORT || 3030;

const express  = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres_en = require('./data/genres/en-US.json');

const app = express();

// -----------------------------------------------------------------------------
//  CONFIGURATION
// -----------------------------------------------------------------------------

mongoose.connect('mongodb://localhost/ensembledb');
app.use(express.static(__dirname + '/app'));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function (request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

// -----------------------------------------------------------------------------
//  MONGOOSE MODELS
// -----------------------------------------------------------------------------

const Characters = mongoose.model('Characters', {
	first_name : String,
	middle_name: String,
	last_name  : String,
	gender     : String,
	origin     : String,
	age        : String,
});

const Books = mongoose.model('Books', {
	title : String,
	author: String,
	series: String,
	cast  : String,
	desc  : String,
	genre : String,
	read  : String
});

// -----------------------------------------------------------------------------
//  REST API -- BOOKS
// -----------------------------------------------------------------------------

app.get('/books', function(request, response) {
	Books.find(function(error, books) {
		if (error) {
			response.send(error);
		}
		response.json(books);
	});
});

app.get('/book/:id', (req, res) => {
	Books.findOne({ _id: req.params.id }, function(err, book) {
		if (err){
			res.json({ error: err });
		}
		res.json({ book });
	});
});


app.post('/book', function(request, response) {
	const book = new Books();
	book.title = request.body.title;
	book.author = request.body.author;
	book.series = request.body.series;
	book.cast = request.body.cast;
	book.desc = request.body.desc;
	book.genre = request.body.genre;
	book.read = request.body.read;

	book.save(function(error, book) {
		if (error) {
			response.json({ error: error });
		}
		console.log('Book added!');
		response.json({ message: 'Book added!', data: book });

	});
});

app.delete('/book', function(request, response, next) {

	Books.findByIdAndRemove(request.body._id, function(error, book) {
		if (error)
			response.send(error);
		response.json({ message: 'Book deleted!', data: book });
	});
});

// -----------------------------------------------------------------------------
//  REST API -- CHARACTERS
// -----------------------------------------------------------------------------

app.get('/characters', function(request, response) {
	Characters.find(function(error, characters) {
		if (error)
			response.send(error);
		response.json(characters);
	});
});

app.get('/character/:id', (req, res) => {
	Characters.findOne({ _id: req.params.id }, function(err, character) {
		if (err){
			res.json({ error: err });
		}
		res.json({ character });
	});
});

app.post('/character', function(request, response, next) {
	const character = new Characters();
	character.first_name = request.body.first_name;
	character.last_name = request.body.last_name;
	character.age = request.body.age;
	character.origin = request.body.origin;
	character.gender = request.body.gender;
	character.book = request.body.book;
	character.series = request.body.series;
	character.family = request.body.family;

	character.save(function(error, character) {
		if (error) { return next(error); }

		response.json({ message: 'Character added!', data: character });

	});
});

app.put('/characters', function(request, response, next) {
	Characters.findById(request.body._id, function(error, character) {

		character.first_name = request.body.first_name;
		character.last_name = request.body.last_name;
		character.age = request.body.age;
		character.origin = request.body.origin;
		character.gender = request.body.gender;

		character.save(function(error, character) {
			if (error) { return next(error); }

			response.json({ message: 'Character added!', data: character });
		});

	});

});

app.post('/view_character', function(request, response, next) {
	Characters.findById(request.body._id, function(error, selection) {
		if (error)
			response.send(error);
		response.json(selection);
	});
});

app.post('/edit_character', function(request, response, next) {
	Characters.findById(request.body._id, function(error, character) {
		if (error)
			response.send(error);
		response.json(character);
	});
});

app.post('/delete_character', function(request, response, next) {

	Characters.findByIdAndRemove(request.body._id, function(error, character) {
		if (error)
			response.send(error);
		response.json({ message: 'Character deleted!', data: character });
	});
});

// -----------------------------------------------------------------------------
//  REST API -- GENRES
// -----------------------------------------------------------------------------

app.get('/genres/:lang', function(req, res) {
	res.json({
		lang: req.params.lang,
		data: genres_en
	});

});

// -----------------------------------------------------------------------------
//  LISTENING
// -----------------------------------------------------------------------------

app.listen(port);
console.log('App listening on port ' + port);
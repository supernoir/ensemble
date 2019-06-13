// -----------------------------------------------------------------------------
//  SETUP
// -----------------------------------------------------------------------------

const port = process.env.PORT || 3030;

const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const genres_en = require('./data/genres/en-US.json');

const apiVersion = 'v0.0.1';
const app = express();

// -----------------------------------------------------------------------------
//  CONFIGURATION
// -----------------------------------------------------------------------------

mongoose.connect('mongodb://localhost/ensembledb');
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(function(request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

// Write Logs to file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const loggingFormat = ':method :url :status :res[content-length] - :response-time ms';

app.use(morgan(loggingFormat, { stream: accessLogStream }));

// -----------------------------------------------------------------------------
//  MONGOOSE MODELS
// -----------------------------------------------------------------------------

const Characters = mongoose.model('Characters', {
	first_name : String,
	middle_name: String,
	last_name  : String,
	gender     : String,
	origin     : String,
	age        : String
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

const actions = {
	'add_book'        : 'add_book',
	'edit_book'       : 'edit_book',
	'delete_book'     : 'delete_book',
	'add_character'   : 'add_character',
	'edit_character'  : 'edit_character',
	'delete_character': 'delete_character'
};

const Events = mongoose.model('Events', {
	user     : String,
	action   : String,
	timestamp: String,
	ref      : String
});

// -----------------------------------------------------------------------------
//  REST API -- BOOKS
// -----------------------------------------------------------------------------

app.get('/books', async(req, res) => {
	await Books.find((error, books) => {
		if (error) {
			res.json({ error });
			throw error;
		}
		res.json(books);
	});
});

app.get('/book/:id', async(req, res) => {
	await Books.findOne({ _id: req.params.id }, (error, book) => {
		if (error) {
			res.json({ error });
			throw error;
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
		response.json({ message: 'Book added!', data: book });
	});
});

/**
 * Edit a single book
 */
app.post('/book/:id', (req, res) => {
	Books.findOne({ _id: req.params.id }, function(err, book) {
		if (err) {
			res.json({ error: err });
		}
		book.title = req.body.title;
		book.author = req.body.author;
		book.series = req.body.series;
		book.cast = req.body.cast;
		book.desc = req.body.desc;
		book.genre = req.body.genre;

		book.save(function(error, book) {
			if (error) {
				res.json({ error: error });
			}
			res.json({ message: `Book ${req.params.id} edited`, data: book });
		});
	});
});

app.delete('/book', function(request, response, next) {
	Books.findByIdAndRemove(request.body._id, function(error, book) {
		if (error) response.send(error);
		response.json({ message: 'Book deleted!', data: book });
	});
});

// -----------------------------------------------------------------------------
//  REST API -- CHARACTERS
// -----------------------------------------------------------------------------

app.get('/characters', async (req, res) => {
	await Characters.find((error, characters) => {
		if (error) {
			res.json({ error });
			throw error;
		}
		res.json(characters);
	});
});

app.get('/character/:id', async(req, res) => {
	await Characters.findOne({ _id: req.params.id }, (error, character) => {
		if (error) {
			res.json({ error });
			throw error;
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
		if (error) {
			return next(error);
		}

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
			if (error) {
				return next(error);
			}

			response.json({ message: 'Character added!', data: character });
		});
	});
});

app.post('/view_character', function(request, response, next) {
	Characters.findById(request.body._id, function(error, selection) {
		if (error) response.send(error);
		response.json(selection);
	});
});

app.post('/edit_character', function(request, response, next) {
	Characters.findById(request.body._id, function(error, character) {
		if (error) response.send(error);
		response.json(character);
	});
});

app.post('/delete_character', function(request, response, next) {
	Characters.findByIdAndRemove(request.body._id, function(error, character) {
		if (error) response.send(error);
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
//  REST API -- HISTORY
// -----------------------------------------------------------------------------

app.get('/events', (req, res) => {
	Events.find((err, events) => {
		if (err) {
			res.json(err);
		}
		res.json(events);
	});
});

app.post('/event', (req, res) => {
	const event = new Events();
	event.user = req.body.user;
	event.action = req.body.action;
	event.timestamp = new Date().getTime();
	event.ref = req.body.ref;

	event.save((error, event) => {
		if (error) {
			res.json({
				error: error
			});
		}
		res.json({ message: 'Event added!', data: event });
	});
});

// -----------------------------------------------------------------------------
//  REST API -- BOOKS
// -----------------------------------------------------------------------------
const logsFromFile = fs.readFileSync(path.join(__dirname, 'access.log'))
	.toString()
	.split('\n');

const getDbReadyState = () => {
	let dbState = mongoose.connection.readyState;
	let status = '';

	switch (dbState) {
		case 0:
			status = '0 - Disconnected';
			break;
		case 1:
			status = '1 - Connected';
			break;
		case 2:
			status = '2 - Connecting';
			break;
		case 3:
			status = '3 - Disconnecting';
			break;
		case 4:
			status = '4 - Invalid Credentials';
			break;
		default:
			status = 'X - Status couldn\'nt be obtained';
			break;
	}
	return status;
};

app.get('/admin', function(req, res) {
	res.json({
		api: [
			{
				version: apiVersion,
				logs   : logsFromFile,
				uptime : process.uptime()
			}
		],
		db: [
			{
				status: getDbReadyState()
				// models         : async() => await mongoose.connection.models,
				// totalBooks     : async() => await Books.countDocuments(),
				// totalCharacters: async() => await Characters.countDocuments()
			}
		]
		/*
		client: {
					lang: req.params.lang
				}
		*/
	});
});

// -----------------------------------------------------------------------------
//  LISTENING
// -----------------------------------------------------------------------------

app.listen(port);
console.log('App listening on port ' + port);

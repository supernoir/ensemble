// -----------------------------------------------------------------------------
//  SETUP
// -----------------------------------------------------------------------------

const port = process.env.PORT || 3030;

const express = require('express');
const bodyParser = require('body-parser');
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

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
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

const Projects = mongoose.model('Projects', {
	title : String,
	author: String,
	series: String,
	cast  : String,
	desc  : String,
	genre : String,
	read  : String
});

const actions = {
	add_project     : 'add_project',
	edit_project    : 'edit_project',
	delete_project  : 'delete_project',
	add_character   : 'add_character',
	edit_character  : 'edit_character',
	delete_character: 'delete_character'
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

app.get('/projects', async (req, res) => {
	await Projects.find((error, projects) => {
		if (error) {
			res.json({ error });
			throw error;
		}
		res.json(projects);
	});
});

app.get('/project/:id', (req, res) => {
	Projects.findOne({ _id: req.params.id }, (error, project) => {
		if (error) {
			res.json({ error });
			throw error;
		}

		res.json(project);
	});
});

app.post('/project', (req, res) => {
	const project = new Projects();
	project.title = req.body.title;
	project.author = req.body.author;
	project.series = req.body.series;
	project.cast = req.body.cast;
	project.desc = req.body.desc;
	project.genre = req.body.genre;
	project.read = req.body.read;

	project.save((error, project) => {
		if (error) {
			res.json({ error: error });
		}
		res.json({ message: 'Project added!', data: project });
	});
});

/**
 * Edit a single project
 */
app.post('/project/:id', (req, res) => {
	Projects.findOne({ _id: req.params.id }, (err, project) => {
		if (err) {
			res.json({ error: err });
		}
		project.title = req.body.title;
		project.author = req.body.author;
		project.series = req.body.series;
		project.cast = req.body.cast;
		project.desc = req.body.desc;
		project.genre = req.body.genre;

		project.save((error, project) => {
			if (error) {
				res.json({ error: error });
			}
			res.json({ message: `Project ${req.params.id} edited`, data: project });
		});
	});
});

app.delete('/project', (req, res) => {
	Projects.findByIdAndRemove(req.body._id, (error, project) => {
		if (error) res.send(error);
		res.json({ message: 'Project deleted!', data: project });
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

app.get('/character/:id', async (req, res) => {
	await Characters.findOne({ _id: req.params.id }, (error, character) => {
		if (error) {
			res.json({ error });
			throw error;
		}
		res.json(character);
	});
});

app.post('/character', (req, res, next) => {
	const character = new Characters();
	character.first_name = req.body.first_name;
	character.last_name = req.body.last_name;
	character.age = req.body.age;
	character.origin = req.body.origin;
	character.gender = req.body.gender;
	character.project = req.body.project;
	character.series = req.body.series;
	character.family = req.body.family;

	character.save((error, character) => {
		if (error) {
			return next(error);
		}

		res.json({ message: 'Character added!', data: character });
	});
});

app.put('/characters', (req, res) => {
	Characters.findById(req.body._id, (error, character) => {
		character.first_name = req.body.first_name;
		character.last_name = req.body.last_name;
		character.age = req.body.age;
		character.origin = req.body.origin;
		character.gender = req.body.gender;

		character.save((err, character) => {
			if (err) res.send(err);
			res.json({ message: 'Character added!', data: character });
		});
	});
});

app.post('/view_character', (req, res) => {
	Characters.findById(req.body._id, (err, selection) => {
		if (err) res.send(err);
		res.json(selection);
	});
});

app.post('/edit_character', (req, res) => {
	Characters.findById(req.body._id, (err, character) => {
		if (err) res.send(err);
		res.json(character);
	});
});

app.post('/delete_character', (req, res) => {
	Characters.findByIdAndRemove(req.body._id, (err, character) => {
		if (err) res.send(err);
		res.json({ message: 'Character deleted!', data: character });
	});
});

// -----------------------------------------------------------------------------
//  REST API -- GENRES
// -----------------------------------------------------------------------------

app.get('/genres', (req, res) => {
	res.json({
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
const logsFromFile = fs.readFileSync(path.join(__dirname, 'access.log')).toString()
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

app.get('/admin', (req, res) => {
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
				name       : 		mongoose.connection.db.databaseName,
				status: getDbReadyState(),
			}
		]
	});
});

// -----------------------------------------------------------------------------
//  LISTENING
// -----------------------------------------------------------------------------

app.listen(port);
console.log('App listening on port ' + port);

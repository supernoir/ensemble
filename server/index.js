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

/**
 * Users Model
 * Defines user properties
 */
const Users = mongoose.model('Users', {
	// The username given by the user
	username : String,
	// The fullname optionally provided
	full_name: String,
	// The email address to contact the user
	email    : String,
	// The creation date of the user account
	createdAt: String,
	// The projects associated with the user
	projects : Array,
	// Reference to the Role Model
	role     : String
});

/**
 * Roles Model
 * used to define roles for users
 * ex: Admin, Author, Editor, Reader
 */
const Roles = mongoose.model('Roles', {
	// The type of role
	type : String,
	// The users associated with that role
	users: Array
});

const Tags = mongoose.model('Tags', {
	type: String,
	name: String,
	ref : String
});

/**
 * Characters Model
 * Shapes character properties and aspects
 */
const Characters = mongoose.model('Characters', {
	// The project associated with the character
	// TODO: project should be a ref!
	project    : String,
	// A Description of the character
	desc       : String,
	// The first name of the character
	first_name : String,
	// The potential middle name of the character
	middle_name: String,
	// The last name of the character
	last_name  : String,
	// The fullname compiled of the first, middle and last names
	full_name  : String,
	// The gender expression of the character
	gender     : String,
	// The nationality of the character
	nationality: String,
	// The origin of the character, if different from nationality
	origin     : String,
	// The birthday of the given character
	// TODO: convert to datestamp
	birthday   : String
});

/**
 * Project Model
 * Shapes project properties and aspects
 */
const Projects = mongoose.model('Projects', {
	// The project title
	title        : String,
	// The project status => statuses are saved in PROJECT_STATUS
	status       : String,
	// The author of the Project
	author       : String,
	// Potential Collaborators on the project
	collaborators: Array,
	// If String given, Project will be grouped into the given series
	// TODO: should be ref!
	series       : String,
	// The cast of characters associated with this project
	cast         : String,
	// A description for the project
	desc         : String,
	// The potential genre of the project
	genre        : String,
	// A set of tags to describe the given project
	tags         : Array,
});

/**
 * Events Model
 * models the event object
 */
const Events = mongoose.model('Events', {
	// The user associated with the event
	// TODO: should be a ref to the user, not String!
	user     : String,
	// The action perpetrated
	action   : String,
	// The timestamp of the event action
	timestamp: String,
	// Reference to the item that triggered the event
	// ex: Project Id
	ref      : String
});

// -----------------------------------------------------------------------------
//  REST API -- PROJECTS
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
	project.status = req.body.status;
	project.author = req.body.author;
	project.collaborators = req.body.collaborators;
	//TODO: Series should be a ref!
	project.series = req.body.series;
	project.cast = req.body.cast;
	project.desc = req.body.desc;
	project.genre = req.body.genre;
	project.read = req.body.read;
	project.tags = req.body.tags;

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
		project.status = req.body.status;
		project.author = req.body.author;
		project.collaborators = req.body.collaborators;
		project.series = req.body.series;
		project.cast = req.body.cast;
		project.desc = req.body.desc;
		project.genre = req.body.genre;
		project.tags = req.body.tags;


		project.save((error, project) => {
			if (error) {
				res.json({ error: error });
			}
			res.json({ message: `Project ${req.params.id} edited`, data: project });
		});
	});
});

app.delete('/project', (req, res) => {
	Projects.findByIdAndRemove(req.params.id, (error, project) => {
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
	character.middle_name = req.body.middle_name;
	character.last_name = req.body.last_name;
	character.full_name = req.body.full_name;
	character.birthday = req.body.birthday;
	character.nationality = req.body.nationality;
	character.origin = req.body.origin;
	character.gender = req.body.gender;
	character.project = req.body.project;
	character.series = req.body.series;
	character.desc = req.body.desc;

	character.save((error, character) => {
		if (error) {
			return next(error);
		}

		res.json({ message: 'Character added!', data: character });
	});
});

app.put('/character/:id', (req, res) => {
	const editedCharacter = new Characters();
	editedCharacter._id = req.params.id;
	editedCharacter.first_name = req.body.first_name;
	editedCharacter.middle_name = req.body.middle_name;
	editedCharacter.last_name = req.body.last_name;
	editedCharacter.full_name = req.body.full_name;
	editedCharacter.birthday = req.body.birthday;
	editedCharacter.nationality = req.body.nationality;
	editedCharacter.origin = req.body.origin;
	editedCharacter.gender = req.body.gender;
	editedCharacter.project = req.body.project;
	editedCharacter.series = req.body.series;
	editedCharacter.desc = req.body.desc;

	Characters.findByIdAndUpdate(req.params.id, editedCharacter, { upsert: true }, (error, character) => {
		if (error) {
			res.json({ error });
			throw error;
		}
		res.json(character);
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

app.get('/events/:filter', (req, res) => {
	Events.find((err, events) => {
		if (err) {
			res.json(err);
		}
		let latestEvents = events;

		switch (req.params.filter) {
			case 'latest':
				latestEvents = latestEvents.slice(0, 5);
				res.json(latestEvents);
				break;
			default:
				res.json(latestEvents);
		}
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
//  REST API -- TAGS
// -----------------------------------------------------------------------------

app.get('/tags', (req, res) => {
	Tags.find((err, tags) => {
		if (err) {
			res.json(err);
		}
		res.json(tags);
	});
});

app.get('/tag/:id', (req, res) => {
	Tags.findOne({ _id: req.params.id }, (error, tag) => {
		if (error) {
			res.json({ error });
			throw error;
		}
		res.json(tag);
	});
});

app.post('/tag', (req, res) => {
	const tag = new Tags();
	tag.type = req.body.type;
	tag.name = req.body.name.toLowerCase();
	tag.ref = req.body.ref;

	tag.save((error, tag) => {
		if (error) {
			res.json({
				error: error
			});
		}
		res.json({ message: 'Tag added!', data: tag });
	});
});

// -----------------------------------------------------------------------------
//  REST API -- DASHBOARD
// -----------------------------------------------------------------------------

app.get('/dashboard', (req, res) => {
	Projects.count((err, projectCount) => {
		if (err) {
			res.json(err);
		}
		Characters.count((err, characterCount) => {
			if (err) {
				res.json(err);
			}
			res.json({
				projects  : projectCount || 0,
				characters: characterCount || 0
			});
		});
	});
});

// -----------------------------------------------------------------------------
//  REST API -- ADMIN
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
				//logs   : logsFromFile,
				logs   : [],
				uptime : process.uptime()
			}
		],
		db: [
			{
				name  : mongoose.connection.db.databaseName,
				status: getDbReadyState()
			}
		]
	});
});

// -----------------------------------------------------------------------------
//  LISTENING
// -----------------------------------------------------------------------------

app.listen(port);
console.log('App listening on port ' + port);

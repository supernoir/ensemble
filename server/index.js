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
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Import Models
const { UsersModel, RolesModel, TagsModel, CharactersModel, ProjectsModel, EventsModel } = require('./models');

// Import Helpers
const currentApiVersion = require('./helper/currentVersion');

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

app.use(helmet());
app.use(cors());

// Write Logs to file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const loggingFormat = ':method :url :status :res[content-length] - :response-time ms';

app.use(morgan(loggingFormat, { stream: accessLogStream }));

// -----------------------------------------------------------------------------
//  REST API ROUTES
// -----------------------------------------------------------------------------

const projectApi = require('./api/projects');
projectApi(app, ProjectsModel, currentApiVersion);

const characterApi = require('./api/characters');
characterApi(app, CharactersModel, currentApiVersion);

const eventApi = require('./api/events');
eventApi(app, EventsModel, currentApiVersion);

const tagApi = require('./api/tags');
tagApi(app, TagsModel, currentApiVersion);

const dashboardApi = require('./api/dashboard');
dashboardApi(app, CharactersModel, ProjectsModel, currentApiVersion);

const adminApi = require('./api/admin');
adminApi(app, mongoose, currentApiVersion);

// -----------------------------------------------------------------------------
//  LISTENING
// -----------------------------------------------------------------------------

app.listen(port, err => {
	if (err) {
		process.stderr.write(err);
	}
	process.stdout.write(`## API running | Port ${port} | Version ${currentApiVersion.version}\n`);
});

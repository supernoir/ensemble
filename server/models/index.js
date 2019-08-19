const mongoose = require('mongoose');

// -----------------------------------------------------------------------------
//  MONGOOSE MODELS
// -----------------------------------------------------------------------------

/**
 * Users Model
 * Defines user properties
 */
const UsersModel = mongoose.model('Users', {
	// The username given by the user
	username   : String,
	// The permissions the user has
	permissions: Array,
	// THe entities the user can access
	entities   : Array,
	// The fullname optionally provided
	full_name  : String,
	// The email address to contact the user
	email      : String,
	// The creation date of the user account
	createdAt  : String,
	// The projects associated with the user
	projects   : Array,
	// The characters associated with the user
	characters : Array,
	// Reference to the Role Model
	role       : String
});

/**
 * Roles Model
 * used to define roles for users
 * ex: Admin, Author, Editor, Reader
 */
const RolesModel = mongoose.model('Roles', {
	// The type of role
	type : String,
	// The users associated with that role
	users: Array
});

const TagsModel = mongoose.model('Tags', {
	type: String,
	name: String,
	ref : String
});

/**
 * Characters Model
 * Shapes character properties and aspects
 */
const CharactersModel = mongoose.model('Characters', {
	// The project associated with the character
	// TODO: project should be a ref!
	projects   : Array,
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
const ProjectsModel = mongoose.model('Projects', {
	// The type of project
	type         : String,
	// The project title
	title        : String,
	// The project status => statuses are saved in PROJECT_STATUS
	status       : String,
	// The authors of the Project
	authors      : Array,
	// Potential Collaborators on the project
	collaborators: Array,
	// If String given, Project will be grouped into the given series
	// TODO: should be ref!
	series       : String,
	// The cast of characters associated with this project
	cast         : Array,
	// A description for the project
	desc         : String,
	// The potential genre of the project
	genres       : Array,
	// A set of tags to describe the given project
	tags         : Array,
	// A set of texts compiled into the projects contents
	content      : Array
});

/**
 * Events Model
 * models the event object
 */
const EventsModel = mongoose.model('Events', {
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

module.exports = {
	UsersModel,
	RolesModel,
	TagsModel,
	CharactersModel,
	ProjectsModel,
	EventsModel
};

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import intl from 'react-intl-universal';
import axios from 'axios';

// Constants
const DEFAULT_LOCALE = 'en-US';
const locales = {
	'en-US': require('./data/locales/en-US.json'),
	'es-ES': require('./data/locales/es-ES.json'),
	'de-DE': require('./data/locales/de-DE.json')
};

const API_URI = 'http://localhost:3030';

// Import Constants
import API_ACTIONS from './constants/apiActions';

// Import Services
import Auth from './services/Auth';

// Import Layouts
import Navbar from './basics/Navbar';

// --- BASE
import Dashboard from './scenes/Dashboard';
import Login from './scenes/Base/Login';
import AdminPanel from './scenes/Admin/AdminPanel';

// --- BOOKS
import ProjectsList from './scenes/Projects/ProjectsList';
import Project from './scenes/Projects/Project';
import NewProject from './scenes/Projects/NewProject';
import EditProject from './scenes/Projects/EditProject';

// --- CHARACTERS
import CharactersList from './scenes/Characters/CharactersList';
import Character from './scenes/Characters/Character';
import NewCharacter from './scenes/Characters/NewCharacter';
import EditCharacter from './scenes/Characters/EditCharacter';

// --- EVENTS
import EventsList from './scenes/Events/EventsList';

// --- TAGS
import TagsList from './scenes/Tags/TagsList';

import MessengerContainer from './containers/MessengerContainer';
import { SET_LOCALE } from './actions/setLocale';
import { LOAD_CURRENT_PAGE } from './actions/loadCurrentPage';
import { GET_SINGLE_PROJECT } from './actions/getSingleProject';
import { GET_ALL_PROJECTS } from './actions/getAllProjects';
import { GET_SINGLE_CHARACTER } from './actions/getSingleCharacter';
import { GET_ALL_CHARACTERS } from './actions/getAllCharacters';

/**
 * Class App
 */
export default class App extends React.Component {
	constructor(props) {
		super(props);

		// Initialize Auth
		this.auth = new Auth(this.props.history);

		// Initialize component state
		this.state = {
			currentLocale: DEFAULT_LOCALE,
			loading      : false,
			genres       : [],
			admin        : {},
			events       : [],
			projects     : [],
			project      : {},
			characters   : [],
			character    : {},
			dashboard    : [],
			tags         : []
		};
	}

	/**
	 * Method SetCurrentLocale
	 * @param {string} locale
	 */
	setCurrentLocale = locale => {
		this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: true });
		this.setState({
			currentLocale: locale || DEFAULT_LOCALE
		});
		this.props.setLocale({ type: SET_LOCALE, locale });
		this.loadLocales(locale);
		this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
	}

	/**
	 * Method loadLocales
	 * @param {string} lang
	 */
	loadLocales(lang) {
		intl
			.init({
				currentLocale: lang,
				locales
			})
			.then(() => {
				this.setState({ loading: false });
			});
	}

	retrieveGenres = lang => {
		axios
			.get(`http://localhost:3030/genres/${lang}`)
			.catch(err => {
				this.props.addMessage({
					type   : 'error',
					content: err.message
				});
			})
			.then(res => {
				this.setState({
					genres: res.data.data
				});
			});
	}

	sendApiRequest = (uri, action, resource, param, payload) => {
		this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: true });
		let targetUri = uri;
		resource !== void 0 ? (targetUri += '/' + resource) : '';
		param !== void 0 ? (targetUri += '/' + param) : '';

		try {
			switch (action) {
				case API_ACTIONS.GET:
					axios({
						method      : API_ACTIONS.GET,
						url         : targetUri,
						responseType: 'json',
						headers     : {
							'content-type': 'application/json'
						}
					})
						.catch(err => {
							this.props.addMessage({
								type   : 'error',
								content: err.message
							});

							this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
						})
						.then(res => {
							switch (resource) {
								case 'project':
									this.props.getSingleProject({
										type   : GET_SINGLE_PROJECT,
										project: res.data
									});
									break;
								case 'projects':
									this.props.getAllProjects({
										type    : GET_ALL_PROJECTS,
										projects: res.data
									});
									break;
								case 'character':
									this.props.getSingleCharacter({
										type     : GET_SINGLE_CHARACTER,
										character: res.data
									});
									break;
								case 'characters':
									this.props.getAllCharacters({
										type      : GET_ALL_CHARACTERS,
										characters: res.data
									});
									break;
								default:
									break;
							}
							this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });

							this.setState({
								[resource]: res.data
							});
						});
					break;
				case API_ACTIONS.POST:
					axios({
						method      : API_ACTIONS.POST,
						url         : targetUri,
						responseType: 'json',
						headers     : {
							'content-type': 'application/json'
						},
						params: param,
						data  : payload
					})
						.catch(err => {
							this.props.addMessage({
								type   : 'error',
								content: err.message
							});

							this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
						})
						.then(res => {
							this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });

							this.setState({
								[resource]: res.data
							});
						});
					break;
				case API_ACTIONS.PUT:
					axios({
						method      : API_ACTIONS.PUT,
						url         : targetUri,
						responseType: 'json',
						headers     : {
							'content-type': 'application/json'
						},
						params: param,
						data  : payload
					})
						.catch(err => {
							this.props.addMessage({
								type   : 'error',
								content: err.message
							});

							this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
						})
						.then(res => {
							this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
							this.setState({
								[resource]: res.data
							});
						});
					break;
				case API_ACTIONS.DELETE:
					axios({
						method      : API_ACTIONS.DELETE,
						url         : targetUri,
						responseType: 'json',
						headers     : {
							'content-type': 'application/json'
						},
						params: param
					}).catch(err => {
						this.props.addMessage({
							type   : 'error',
							content: err.message
						});

						this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
					});
					break;
				default:
					break;
			}
		} catch (err) {
			this.props.addMessage({
				type   : 'error',
				content: err.message
			});

			this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
		}
		this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
	}

	/**
 	 * Method componentWillMount
 	 */
	componentWillMount() {
		this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: true });
		this.loadLocales(this.state.currentLocale);
	}

	componentDidMount() {
		this.props.loadCurrentPage({ type: LOAD_CURRENT_PAGE, loading: false });
	}

	/**
   * Method render
   */
	render() {
		return (
			<Router>
				<React.Fragment>
					<Navbar setCurrentLocale={locale => this.setCurrentLocale(locale)} {...this.props} />
					<main className="mx-0">
						<MessengerContainer />
						<Route
							exact
							path="/"
							render={props => (
								<Dashboard
									{...props}
									loading={this.props.loading}
									dashboardData={this.state.dashboard}
									getDashboardData={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'dashboard')}
									eventsData={this.state.events}
									getEvents={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'events', 'latest')}
								/>
							)}
						/>
						<Route path="/login" render={props => <Login {...props} />} />
						<Route
							path="/admin"
							render={() => (
								<AdminPanel
									loading={this.props.loading}
									adminData={this.state.admin}
									getAdminData={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'admin')}
								/>
							)}
						/>

						{/* PROJECTS */}
						<Route
							path="/projects"
							render={props => (
								<ProjectsList
									loading={this.props.loading}
									getProjects={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'projects')}
									deleteSpecificProject={id => {
										this.sendApiRequest(API_URI, API_ACTIONS.DELETE, 'project', id);
									}}
									projects={this.props.projects}
									{...props}
								/>
							)}
						/>
						<Route
							path="/addproject"
							render={props => (
								<NewProject
									loading={this.props.loading}
									genres={this.state.genres}
									addProject={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'project', '', data);
									}}
									addTag={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'tag', '', data);
									}}
									addEvent={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'event', '', data);
									}}
									{...props}
								/>
							)}
						/>
						<Route
							path="/project/:id"
							render={props => (
								<Project
									loading={this.props.loading}
									match={props.match}
									getProjectById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'project', id)}
									project={this.props.project !== void 0 ? this.props.project : {}}
									deleteSpecificProject={id => {
										this.sendApiRequest(API_URI, API_ACTIONS.DELETE, 'project', id);
									}}
								/>
							)}
						/>
						<Route
							path="/editproject/:id"
							render={props => (
								<EditProject
									loading={this.props.loading}
									editProject={(id, data) => {
										this.sendApiRequest(API_URI, API_ACTIONS.PUT, 'project', id, data);
									}}
									getProjectById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'project', id)}
									project={this.props.project !== void 0 ? this.props.project : {}}
									addEvent={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'event', '', data);
									}}
									addTag={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'tag', '', data);
									}}
									match={props.match}
									{...props}
								/>
							)}
						/>

						{/* CHARACTERS */}
						<Route
							path="/characters"
							render={() => (
								<CharactersList
									loading={this.props.loading}
									getCharacters={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'characters')}
									characters={this.props.characters !== void 0 ? this.props.characters : []}
									getProjectById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'project', id)}
									project={this.props.project}
								/>
							)}
						/>
						<Route
							path="/addcharacter"
							render={props => (
								<NewCharacter
									loading={this.props.loading}
									addCharacter={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'character', '', data);
									}}
									addEvent={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'event', '', data);
									}}
									getProjects={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'projects')}
									projects={this.props.projects}
									{...props}
								/>
							)}
						/>
						<Route
							path="/editcharacter/:id"
							render={props => (
								<EditCharacter
									loading={this.props.loading}
									editCharacter={(id, data) => {
										this.sendApiRequest(API_URI, API_ACTIONS.PUT, 'character', id, data);
									}}
									getCharacterById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'character', id)}
									character={this.props.character !== void 0 ? this.props.character : {}}
									getProjects={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'projects')}
									projects={this.props.projects}
									addEvent={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'event', '', data);
									}}
									match={props.match}
									{...props}
								/>
							)}
						/>
						<Route
							path="/character/:id"
							render={props => (
								<Character
									loading={this.props.loading}
									getCharacterById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'character', id)}
									character={this.props.character !== void 0 ? this.props.character : {}}
									match={props.match}
								/>
							)}
						/>
						{/** Events */}
						<Route
							exact
							path="/events"
							render={() => (
								<EventsList loading={this.props.loading} events={this.state.events} getEvents={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'events')} />
							)}
						/>
						{/** Tags */}
						<Route
							exact
							path="/tags"
							render={() => (
								<TagsList loading={this.props.loading} tags={this.state.tags} getTags={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'tags')} />
							)}
						/>
					</main>
				</React.Fragment>
			</Router>
		);
	}
}

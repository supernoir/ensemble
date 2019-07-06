import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import intl from 'react-intl-universal';
import axios from 'axios';

// Constants
const DEFAULT_LOCALE = 'es-ES';
const locales = {
	'en-US': require('./data/locales/en-US.json'),
	'es-ES': require('./data/locales/es-ES.json')
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

// --- CHARACTERS
import CharactersList from './scenes/Characters/CharactersList';
import Character from './scenes/Characters/Character';
import NewCharacter from './scenes/Characters/NewCharacter';
import EditCharacter from './scenes/Characters/EditCharacter';

// --- EVENTS
import EventsList from './scenes/Events/EventsList';

// --- TAGS
import TagsList from './scenes/Tags/TagsList';

import { addMessage } from './actions/addMessage';
import MessengerContainer from './containers/MessengerContainer';
import { setLocale, SET_LOCALE } from './actions/setLocale';

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

setCurrentLocale = (locale) => {
	this.setState({
		loading      : true,
		currentLocale: locale || DEFAULT_LOCALE
	});
	this.props.setLocale({ type: SET_LOCALE, locale });
	this.loadLocales(locale);
	this.setState({
		loading: false
	});
}


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
		axios.get(`http://localhost:3030/genres/${lang}`).catch(err => console.error(err))
			.then(res => {
				this.setState({
					genres: res.data.data
				});
			});
	};

	sendApiRequest = (uri, action, resource, param, payload) => {
		this.setState({
			loading: true
		});
		let targetUri = uri;
		const { store } = this.props;
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
							store.dispatch(
								addMessage({
									type   : 'error',
									content: err.message
								})
							);
							this.setState({
								loading: false
							});
						})
						.then(res => {
							this.setState({
								[resource]: res.data,
								loading   : false
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
							store.dispatch(
								addMessage({
									type   : 'error',
									content: err.message
								})
							);
							this.setState({
								loading: false
							});
						})
						.then(res => {
							this.setState({
								[resource]: res.data,
								loading   : false
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
							store.dispatch(
								addMessage({
									type   : 'error',
									content: err.message
								})
							);
							this.setState({
								loading: false
							});
						})
						.then(res => {
							this.setState({
								[resource]: res.data,
								loading   : false
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
						store.dispatch(
							addMessage({
								type   : 'error',
								content: err.message
							})
						);
						this.setState({
							loading: false
						});
					});
					break;
			}
		} catch (err) {
			store.dispatch(
				addMessage({
					type   : 'error',
					content: err.message
				})
			);
			this.setState({
				loading: false
			});
		}
		this.setState({
			loading: false
		});
	};

	componentWillMount() {
		this.loadLocales(this.state.currentLocale);
	}

	render() {
		return (
			<Router>
				<React.Fragment>
					<Navbar
						setCurrentLocale={(locale)=>this.setCurrentLocale(locale)}
						{...this.props} />
					<main className="mx-0">
						<MessengerContainer />
						<Route
							exact
							path="/"
							render={props => (
								<Dashboard
									{...props}
									loading={this.state.loading}
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
									loading={this.state.loading}
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
									loading={this.state.loading}
									getProjects={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'projects')}
									deleteSpecificProject={id => {
										this.sendApiRequest(API_URI, API_ACTIONS.DELETE, 'project', id);
									}}
									projects={this.state.projects}
									{...props}
								/>
							)}
						/>
						<Route
							path="/addproject"
							render={props => (
								<NewProject
									loading={this.state.loading}
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
									loading={this.state.loading}
									match={props.match}
									getProjectById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'project', id)}
									project={this.state.project !== void 0 ? this.state.project : {}}
								/>
							)}
						/>
						{/* CHARACTERS */}
						<Route
							path="/characters"
							render={() => (
								<CharactersList
									loading={this.state.loading}
									getCharacters={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'characters')}
									characters={this.state.characters !== void 0 ? this.state.characters : []}
									getProjectById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'project', id)}
									project={this.state.project}
								/>
							)}
						/>
						<Route
							path="/addcharacter"
							render={props => (
								<NewCharacter
									loading={this.state.loading}
									addCharacter={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'character', '', data);
									}}
									addEvent={data => {
										this.sendApiRequest(API_URI, API_ACTIONS.POST, 'event', '', data);
									}}
									getProjects={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'projects')}
									projects={this.state.projects}
									{...props}
								/>
							)}
						/>
						<Route
							path="/editcharacter/:id"
							render={props => (
								<EditCharacter
									loading={this.state.loading}
									editCharacter={(id, data) => {
										this.sendApiRequest(API_URI, API_ACTIONS.PUT, 'character', id, data);
									}}
									getCharacterById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'character', id)}
									character={this.state.character !== void 0 ? this.state.character : {}}
									getProjects={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'projects')}
									projects={this.state.projects}
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
									loading={this.state.loading}
									getCharacterById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'character', id)}
									character={this.state.character !== void 0 ? this.state.character : {}}
									match={props.match}
								/>
							)}
						/>
						{/** Events */}
						<Route
							exact
							path="/events"
							render={() => (
								<EventsList loading={this.state.loading} events={this.state.events} getEvents={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'events')} />
							)}
						/>
						{/** Tags */}
						<Route
							exact
							path="/tags"
							render={() => (
								<TagsList
									loading={this.state.loading}
									tags={this.state.tags}
									getTags={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'tags')} />
							)}
						/>
					</main>
				</React.Fragment>
			</Router>
		);
	}
}

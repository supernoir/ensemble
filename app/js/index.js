import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import intl from 'react-intl-universal';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

// Import Styles
import '../public/styles/main.scss';

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
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';

// --- BASE
import Dashboard from './pages/Dashboard';
import Login from './pages/Base/Login';
import AdminPanel from './pages/Admin/AdminPanel';

// --- BOOKS
import ProjectsList from './pages/Projects/ProjectsList';
import Project from './pages/Projects/Project';
import NewProject from './pages/Projects/NewProject';

// --- CHARACTERS
import CharactersList from './pages/Characters/CharactersList';
import Character from './pages/Characters/Character';
import NewCharacter from './pages/Characters/NewCharacter';

export default class Ensemble extends React.Component {
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
			character    : {}
		};
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
		axios
			.get(`http://localhost:3030/genres/${lang}`)
			.catch(err => console.error(err))
			.then(res => {
				this.setState({
					genres: res.data.data
				});
			});
	};

	sendApiRequest = (uri, action, resource, param, payload) => {
		let targetUri = uri;
		resource !== void 0 ? (targetUri += '/' + resource) : '';
		param !== void 0 ? (targetUri += '/' + param) : '';

		switch (action) {
			case API_ACTIONS.GET:
				axios({
					method      : API_ACTIONS.GET,
					url         : targetUri,
					responseType: 'json',
					headers     : {
						'content-type': 'application/json'
					},
				})
					.catch(err => console.error(err))
					.then(res => {
						this.setState({
							[resource]: res.data
						});
					});
				break;
			case API_ACTIONS.POST:
				console.log(targetUri);
				console.log(payload);
				axios({
					method      : API_ACTIONS.POST,
					url         : targetUri,
					responseType: 'json',
					headers     : {
						'content-type': 'application/json'
					},
					//params: param,
					body: payload

				})
					.catch(err => console.error(err))
					.then(res => {
						this.setState({
							[resource]: res.data
						});

					});
				break;

		}
	};

	componentWillMount() {
		this.loadLocales(this.state.currentLocale);
		this.setState({
			loading: true
		});
	}

	render() {
		return (
			<Container>
				<Router>
					<React.Fragment>
						<Navbar />
						<main className="mx-0">
							<Route
								exact
								path="/"
								render={props => (
									<Dashboard {...props} eventsData={this.state.events} getEvents={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'events')} />
								)}
							/>
							<Route path="/login" render={props => <Login {...props} />} />
							<Route
								path="/admin"
								render={() => <AdminPanel adminData={this.state.admin} getAdminData={() => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'admin')} />}
							/>
							{/* BOOKS */}
							<Route path="/projects" render={props => <ProjectsList {...props} />} />
							<Route path="/addproject"
								render={props => <NewProject
									genres={this.state.genres}
									addProject={(data) => this.sendApiRequest(API_URI, API_ACTIONS.POST, 'project', '', data)}
									{...props}
								/>}
							/>
							<Route
								path="/project/:id"
								render={props => (
									<Project
										match={props.match}
										getProjectById={id => this.sendApiRequest(API_URI, API_ACTIONS.GET, 'project', id)}
										project={this.state.project !== void 0 ? this.state.project : {}}
									/>
								)}
							/>
							{/* CHARACTERS */}
							<Route path="/characters" render={props => <CharactersList {...props} />} />
							<Route path="/addcharacter" render={props => <NewCharacter {...props} />} />
							<Route path="/character/:id" render={props => <Character {...props} />} />
						</main>
					</React.Fragment>
				</Router>
				<Footer />
			</Container>
		);
	}
}

ReactDOM.render(<Ensemble />, document.getElementById('app'));

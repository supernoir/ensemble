import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import intl from 'react-intl-universal';
import axios from 'axios';
import {
	Container
} from 'semantic-ui-react';

// Import Styles
import '../public/styles/main.scss';

// I18N
const DEFAULT_LOCALE = 'es-ES';
const locales = {
	'en-US': require('./data/locales/en-US.json'),
	'es-ES': require('./data/locales/es-ES.json')
};

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
	constructor(){
		super();
		this.state = {
			loading               : false,
			currentLocale: DEFAULT_LOCALE,
			genres       : [],
			adminData    : {},
			eventsData   : []
		};
		this.retrieveAdminData = this.retrieveAdminData.bind(this);
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

	retrieveGenres = (lang) => {
		axios
			.get(`http://localhost:3030/genres/${lang}`)
			.catch(err => console.error(err))
			.then(res => {
				this.setState({
					genres: res.data.data
				});
			});
	}

	retrieveEventData = () => {
		axios.get(`http://localhost:3030/events`)
			.catch(err => console.error(err))
			.then(res => {
				this.setState({
					eventsData: res.data
				});
			});
	}

	retrieveAdminData = () => {
		axios.get(`http://localhost:3030/admin`)
			.catch(err => console.error(err))
			.then(res => {
				this.setState({
					adminData: res.data
				});
			});
	}

	componentWillMount() {
		this.loadLocales(this.state.currentLocale);
		this.retrieveGenres(this.state.currentLocale);
		this.retrieveAdminData();
		this.retrieveEventData();
		this.setState({
			loading: true
		});
	}

	render(){
		return (
			<Container>
				<Router>
					<React.Fragment>
						<Navbar />
						<main className="mx-0">
							<Route exact path="/" render={props => <Dashboard {...props} eventsData={this.state.eventsData} />} />
							<Route  path="/login" render={props => <Login {...props} />} />
							<Route  path="/admin" render={props => <AdminPanel adminData={this.state.adminData} {...props} />} />
							{/* BOOKS */}
							<Route  path="/projects" render={props => <ProjectsList {...props} />} />
							<Route  path="/addproject" render={props => <NewProject genres={this.state.genres} {...props}/>} />
							<Route  path="/project/:id" render={props => <Project {...props} />} />
							{/* CHARACTERS */}
							<Route  path="/characters" render={props => <CharactersList {...props} />} />
							<Route  path="/addcharacter" render={props => <NewCharacter {...props} />} />
							<Route  path="/character/:id" render={props => <Character {...props} />} />
						</main>
					</React.Fragment>
				</Router>
				<Footer/>
			</Container>

		);
	}
}

ReactDOM.render(<Ensemble />, document.getElementById('app'));

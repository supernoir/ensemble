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
import BooksList from './pages/Books/BooksList';
import Book from './pages/Books/Book';
import NewBook from './pages/Books/NewBook';

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
			adminData    : {}
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
							<Route exact path="/" render={props => <Dashboard {...props} />} />
							<Route  path="/login" render={props => <Login {...props} />} />
							<Route  path="/admin" render={props => <AdminPanel adminData={this.state.adminData} {...props} />} />
							{/* BOOKS */}
							<Route  path="/books" render={props => <BooksList {...props} />} />
							<Route  path="/addbook" render={props => <NewBook genres={this.state.genres} {...props}/>} />
							<Route  path="/book/:id" render={props => <Book {...props} />} />
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

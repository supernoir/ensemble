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

/* Import Pages */
import Dashboard from './pages/Dashboard';

// --- BOOKS
import BooksList from './pages/Books/BooksList';
import Book from './pages/Books/Book';
import NewBook from './pages/Books/NewBook';

// --- CHARACTERS
import CharactersList from './pages/Characters/CharactersList';
import Character from './pages/Characters/Character';
import NewCharacter from './pages/Characters/NewCharacter';
import Login from './pages/Base/Login';

export default class Ensemble extends React.Component {
	constructor(){
		super();
		this.state = {
			loading               : false,
			currentLocale: DEFAULT_LOCALE,
			genres       : [],
		};
		this.retrieveGenres = this.retrieveGenres.bind(this);
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

	retrieveGenres(lang){
		axios
			.get(`http://localhost:3030/genres/${lang}`)
			.catch(err => console.error(err))
			.then(res => {
				this.setState({
					genres: res.data.data
				});
			});
	}

	componentWillMount() {
		this.loadLocales(this.state.currentLocale);
		this.retrieveGenres(this.state.currentLocale);
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
							<Route exact path="/login" render={props => <Login {...props} />} />
							{/* BOOKS */}
							<Route exact path="/books" render={props => <BooksList {...props} />} />
							<Route exact path="/addbook" render={props => <NewBook genres={this.state.genres} {...props}/>} />
							<Route exact path="/book/:id" render={props => <Book {...props} />} />
							{/* CHARACTERS */}
							<Route exact path="/characters" render={props => <CharactersList {...props} />} />
							<Route exact path="/addcharacter" render={props => <NewCharacter {...props} />} />
							<Route exact path="/character/:id" render={props => <Character {...props} />} />
						</main>
					</React.Fragment>
				</Router>
				<Footer/>
			</Container>

		);
	}
}

ReactDOM.render(<Ensemble />, document.getElementById('app'));

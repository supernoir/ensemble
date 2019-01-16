import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Layouts
import Menu from './layout/Menu';
import Footer from './layout/Footer';

/* Import Pages */
import Dashboard from './pages/Dashboard';

// --- BOOKS
import BooksList from './pages/Books/BooksList';
import Book from './pages/Books/Book';
import NewBook from './pages/Books/NewBook';

// --- CHARACTERS
import CharactersList from './pages/Characters/CharactersList';
import Character from './pages/Characters/Character';

export default class Ensemble extends React.Component {
	render(){
		return (
			<div class="container">
				<Menu/>
				<Router>
					<main className="mx-0">
						<Route exact path="/" render={props => <Dashboard {...props} />} />
						{/* BOOKS */}
						<Route exact path="/books" render={props => <BooksList {...props} />} />
						<Route exact path="/addbook" render={props => <NewBook {...props}/>} />
						<Route exact path="/book/:id" render={props => <Book {...props} />} />
						{/* CHARACTERS */}
						<Route exact path="/characters" render={props => <CharactersList {...props} />} />
						<Route exact path="/character/:id" render={props => <Character {...props} />} />
					</main>
				</Router>
				<Footer/>
			</div>

		);
	}
}

ReactDOM.render(<Ensemble />, document.getElementById('app'));

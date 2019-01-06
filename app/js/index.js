import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Layouts
import Menu from './layout/Menu';
import Footer from './layout/Footer';

// Import Pages
import Dashboard from './pages/Dashboard';
import BooksList from './pages/BooksList';
import Book from './pages/Book';

export default class Ensemble extends React.Component {
	render(){
		return (
			<div class="container">
				<Menu/>
				<Router>
					<main className="mx-0">
						<Route exact path="/" render={props => <Dashboard {...props} />} />
						<Route exact path="/books" render={props => <BooksList {...props} />} />
						<Route exact path="/book/:id" render={props => <Book {...props} />} />
					</main>
				</Router>
				<Footer/>
			</div>

		);
	}
}

ReactDOM.render(<Ensemble />, document.getElementById('app'));

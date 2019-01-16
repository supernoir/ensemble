import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
	render(){
		return(
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#">Ensemble</a>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li><Link to="/books"><span className="glyphicon glyphicon-book"></span> Books</Link></li>
							<li><Link to="/characters"><span className="glyphicon glyphicon-user"></span> Characters</Link></li>
							<li><Link to="/journeys"><span className="glyphicon glyphicon-globe"></span> Journeys</Link></li>
							<li><Link to="/events"><span className="glyphicon glyphicon-calendar"></span> Timeline</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
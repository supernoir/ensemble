import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
	render(){
		return(
			<div>
				<h1>{'Dashboard'}</h1>
				<ul>
					<li><Link to="/books">{'Books'}</Link></li>
					<li><Link to="/characters">{'Characters'}</Link></li>
				</ul>
			</div>
		);
	}
}
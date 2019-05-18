import React from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../layout/MainContainer';
import intl from 'react-intl-universal';

export default class Dashboard extends React.Component {
	render(){
		return(
			<div>
				<h1>{intl.get('component.dashboard')}</h1>
				<MainContainer>
					<ul>
						<li><Link to="/books">{intl.get('entity.books')}</Link></li>
						<li><Link to="/characters">{intl.get('entity.characters')}</Link></li>
					</ul>
				</MainContainer>
			</div>
		);
	}
}
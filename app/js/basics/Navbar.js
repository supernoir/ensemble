import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Menu, Container, Dropdown, Icon } from 'semantic-ui-react';
import LanguageSwitcher from './LanguageSwitcher';
import PropTypes from 'prop-types';

/**
 * Class Navbar
 * The Apps' primary navigation bar and menu
 */
export default class Navbar extends React.Component {
	render() {
		return (
			<Menu inverted fixed="top">
				<Container>
					<Menu.Item as="a" header>
						<Link to="/">
							{intl.get('brand')}
						</Link>
					</Menu.Item>
					<Menu.Item as="a" header><Link to="/projects">
						<Icon circular inverted name="book" /> {intl.get('entity.projects')}</Link>
					</Menu.Item>
					<Menu.Item as="a" header>
						<Link to="/characters"><Icon circular inverted name="address card" /> {intl.get('entity.characters')}</Link>
					</Menu.Item>
					<Menu.Item as="a" header>
						<Link to="/tags"><Icon circular inverted name="tags" /> {intl.get('entity.tags')}</Link>
					</Menu.Item>
					{/**
						<Menu.Item disabled header><Link to="/journeys"><Icon circular inverted name="map signs" /> {intl.get('entity.journeys')}</Link></Menu.Item>
						<Menu.Item disabled header><Link to="/events"><Icon circular inverted name="time" /> {intl.get('entity.timeline')}</Link></Menu.Item>
					*/}
					<Menu.Item as="a" header><Link to="/admin"><Icon circular inverted name="cogs" /> {'Admin Panel'}</Link></Menu.Item>

					<Dropdown
						item
						simple
						icon="user"
						text={'supernoir'}
					>
						<Dropdown.Menu>
							<Dropdown.Item href='/profile'>{'My Profile'}</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item href='/login'>
								{'Log out'}
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<LanguageSwitcher setCurrentLocale={(locale)=>{this.props.setCurrentLocale(locale);}} {...this.props}/>
				</Container>
			</Menu>
		);
	}
}

Navbar.propTypes = {
	setCurrentLocale: PropTypes.func
};
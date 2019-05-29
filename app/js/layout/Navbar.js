import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Menu, Container, Dropdown, Icon } from 'semantic-ui-react';

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
					<Menu.Item as="a" header><Link to="/books"><Icon circular inverted name="book" /> {intl.get('entity.books')}</Link></Menu.Item>
					<Menu.Item as="a" header><Link to="/characters"><Icon circular inverted name="address card" /> {intl.get('entity.characters')}</Link></Menu.Item>
					<Menu.Item disabled header><Link to="/journeys"><Icon circular inverted name="map signs" /> {intl.get('entity.journeys')}</Link></Menu.Item>
					<Menu.Item disabled header><Link to="/events"><Icon circular inverted name="time" /> {intl.get('entity.timeline')}</Link></Menu.Item>
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
				</Container>
			</Menu>
		);
	}
}

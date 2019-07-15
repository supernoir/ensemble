import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Header, Card, Divider, Button } from 'semantic-ui-react';
import CharacterCard from '../../basics/CharacterCard';
import Loader from '../../basics/Loader';
import PropTypes from 'prop-types';

/**
 * Class CharactersList
 * List of characters
 */
export default class CharactersList extends React.Component {
	componentDidMount() {
		this.props.getCharacters();
	}

	getProjectById = id => {
		this.props.getProjectById(id);
	};

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			:	<Container>
				<Breadcrumb>
					<Breadcrumb.Section link>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						<Link to="/characters">{intl.get('entity.characters')}</Link>
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{intl.get('entity.characters')}
						<Header.Subheader>{intl.get('desc.characters')}</Header.Subheader>
					</Header>
					<Divider />
					<Button icon="add">
						<Link to="/addcharacter">{intl.get('character.action-add')}</Link>
					</Button>
				</Segment>

				<Divider />

				<Card.Group>
					{this.props.characters.map((character, index) => {
						return (
							<CharacterCard
								key={`${character}-${index}`}
								character={character}
								projectTitle={this.props.project !== void 0 ? this.props.project.title : ''}
								getProjectTitle={() => this.getProjectById(character.project)}
							/>
						);
					})}
				</Card.Group>
			</Container>;
	}
}

CharactersList.propTypes = {
	loading       : PropTypes.bool,
	getCharacters : PropTypes.func,
	getProjectById: PropTypes.func,
	characters    : PropTypes.shape({
		project: PropTypes.string,
	}),
	project: PropTypes.shape({
		title: PropTypes.string
	})
};
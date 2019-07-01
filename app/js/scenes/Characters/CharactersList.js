import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Header, Card, Divider, Button } from 'semantic-ui-react';
import CharacterCard from '../../basics/CharacterCard';
import Loader from '../../basics/Loader';

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
					{this.props.characters.map(character => {
						return (
							<CharacterCard
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

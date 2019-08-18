import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';

/**
 * Class CharacterCard
 * Displays Characters in a Card View
 */
export default class CharacterCard extends React.Component {
	componentDidMount() {
		this.props.getProjectTitle(this.props.character.project);
	}

	render() {
		return (
			<Card>
				<Card.Content>
					<Card.Header>
						<Link to={`/character/${this.props.character._id}`}>{this.props.character.full_name}</Link>
					</Card.Header>

					{this.props.character.birthday !== void 0 && this.props.character.birthday.length > 0
						? <Card.Meta>
							<Icon name={'birthday cake'} /> {this.props.character.birthday}
						</Card.Meta>
						: null}

					{this.props.character.gender !== void 0 && this.props.character.gender.length > 0
						? <Card.Meta>
							<Icon name={'transgender'} /> {this.props.character.gender}
						</Card.Meta>
						: null}

					<Card.Description>{this.props.character.desc}</Card.Description>
				</Card.Content>
				{this.props.character.project !== void 0 && this.props.projectTitle !== void 0
					? <Card.Content>
						<Button icon basic labelPosition="left">
							<Icon name={'book'} /> <Link to={`/project/${this.props.character.project}`}>{this.props.projectTitle}</Link>
						</Button>
					</Card.Content>
					: null}
				<Card.Content extra>
					<Link to={`/editcharacter/${this.props.character._id}`}>
						<Button circular basic icon="edit" color="blue" content={intl.get('app.edit')} />
					</Link>
				</Card.Content>
			</Card>
		);
	}
}

CharacterCard.propTypes = {
	projectTitle   : PropTypes.string,
	getProjectTitle: PropTypes.func,
	character      : PropTypes.shape({
		_id      : PropTypes.Number,
		project  : PropTypes.Number,
		desc     : PropTypes.string,
		gender   : PropTypes.string,
		birthday : PropTypes.string,
		full_name: PropTypes.string
	})
};

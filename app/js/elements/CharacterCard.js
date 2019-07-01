import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom';
import { Card, Icon, Button } from './node_modules/semantic-ui-react';

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
					<Card.Meta>
						<Icon name={'birthday cake'} /> {this.props.character.birthday}
					</Card.Meta>
					<Card.Meta>
						<Icon name={'transgender alternate'} /> {this.props.character.gender}
					</Card.Meta>
					<Card.Description>{this.props.character.desc}</Card.Description>
				</Card.Content>
				{this.props.character.project !== void 0 ? (
					<Card.Content>
						<Icon name={'book'} /> <Link to={`/project/${this.props.projectTitle}`}></Link>
					</Card.Content>
				) : null}
				<Card.Content extra>
					<Link to={`/editcharacter/${this.props.character._id}`}>
						<Button circular icon="edit" color="green" />
					</Link>
					<Button circular icon="delete" color="red" />
				</Card.Content>
			</Card>
		);
	}
}

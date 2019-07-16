import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Divider, Header, Button, Icon } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import PropTypes from 'prop-types';

/**
 * Class Character
 * Single Character View
 */
export default class Character extends React.Component {
	constructor(){
		super();
		this.state = {
			character: []
		};
	}
	componentDidMount(){
		this.props.getCharacterById(this.props.match.params.id);
	}

	render(){
		return this.props.loading
			? <Loader loading={this.props.loading} />
			:	<Container>
				<Breadcrumb>
					<Breadcrumb.Section>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section>
						<Link to="/characters">{intl.get('entity.characters')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						{this.props.character.first_name} {this.props.character.last_name}
					</Breadcrumb.Section>
				</Breadcrumb>
				<Segment>
					<Header as='h2'>
						{this.props.character.first_name} <b>{this.props.character.last_name}</b>
						<Header.Subheader>{this.props.character.gender}, {this.props.character.age}</Header.Subheader>
					</Header>
					<Divider/>

					<p>
						<Icon name='info circle'/>{this.props.character.desc}
					</p>

					<Divider/>
					<Button>
						<Link to={`/editcharacter/${this.props.character._id}`}>{intl.get('character.action-edit')}</Link>
					</Button>
					<Button>
						<Link to={`/deletecharacter/${this.props.character._id}`}>{intl.get('character.action-delete')}</Link>
					</Button>
				</Segment>
			</Container>;
	}
}

Character.propTypes = {
	loading         : PropTypes.bool,
	match           : PropTypes.object,
	getCharacterById: PropTypes.func,
	character       : PropTypes.shape({
		first_name: PropTypes.string,
		last_name : PropTypes.string,
		gender    : PropTypes.string,
		age       : PropTypes.string,
		desc      : PropTypes.string
	})
};
import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Divider, Header, Button, Icon } from 'semantic-ui-react';
import Loader from '../../basics/Loader';

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
					<Breadcrumb.Section link>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section link>
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
						{intl.get('character.action-edit')}
					</Button>
					<Button>
						{intl.get('character.action-delete')}
					</Button>
				</Segment>
			</Container>;
	}
}
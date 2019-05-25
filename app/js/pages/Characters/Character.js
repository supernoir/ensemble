import React from 'react';
import axios from 'axios';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Divider, Header, Button, Icon } from 'semantic-ui-react';

export default class Character extends React.Component {
	constructor(){
		super();
		this.state = {
			character: []
		};
	}
	componentDidMount(){
		axios.get(`http://localhost:3030/character/${this.props.match.params.id}`)
			.then(res => {
				this.setState({ character: res.data.character });
			}
			);
	}

	render(){
		return(
			<Container>
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
						{this.state.character.first_name} {this.state.character.last_name}
					</Breadcrumb.Section>
				</Breadcrumb>
				<Segment>
					<Header as='h2'>
						{this.state.character.first_name} <b>{this.state.character.last_name}</b>
						<Header.Subheader>{this.state.character.gender}, {this.state.character.age}</Header.Subheader>
					</Header>
					<Divider/>

					<p>
						<Icon name='info circle'/>{this.state.character.desc}
					</p>

					<Divider/>
					<Button>
						{intl.get('character.action-edit')}
					</Button>
					<Button>
						{intl.get('character.action-delete')}
					</Button>
				</Segment>

			</Container>
		);
	}
}
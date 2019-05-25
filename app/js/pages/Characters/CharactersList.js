import React from 'react';
import axios from 'axios';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Header, Card, Divider, Button, Icon } from 'semantic-ui-react';

export default class CharactersList extends React.Component {
	constructor(){
		super();
		this.state = {
			characters: []
		};
	}
	componentDidMount(){
		axios.get('http://localhost:3030/characters')
			.then(res => {
				this.setState({ characters: res.data });
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
					<Breadcrumb.Section active>
						<Link to="/characters">{intl.get('entity.characters')}</Link>
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{intl.get('entity.characters')}
						<Header.Subheader>{intl.get('desc.characters')}</Header.Subheader>
					</Header>
					<Divider/>
					<Button icon='add'>
						<Link to="/addcharacter">{intl.get('character.action-add')}</Link>
					</Button>

				</Segment>

				<Divider/>

				<Card.Group>
					{this.state.characters.map(character => {
						return (
							<Card>
								<Card.Content>
									<Card.Header>
										<Link to={`/character/${character._id}`}>{character.first_name} {character.last_name}</Link>
									</Card.Header>
									<Card.Meta>
										{character.gender},{character.age}
									</Card.Meta>
									<Card.Description>{character.desc}</Card.Description>
								</Card.Content>
								<Card.Content>
									<ul>
										{character.series !== void 0
											? <li>
												<b>{intl.get('entity.books.series')}</b> <a href="/:cast">{character.series}</a>
											</li>
											: null
										}
										{character.book !== void 0
											? <li>
												<b>{intl.get('entity.character')}</b> <a href="/:cast">{character.book}</a>
											</li>
											: null
										}
										{character.family !== void 0
											? <li>
												<b>{'I18N Family'}:</b> <a href="/:cast">{character.family}</a>
											</li>
											: null
										}
									</ul>
								</Card.Content>
								<Card.Content extra>
									<Button circular icon='edit' color='green'/>
									<Button circular icon='delete' color='red'/>
								</Card.Content>
							</Card>
						);
					})}
				</Card.Group>
			</Container>
		);
	}
}
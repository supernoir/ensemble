import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Table, Divider, Button, Icon } from 'semantic-ui-react';

export default class Book extends React.Component {
	constructor(){
		super();
		this.state = {
			book: [],
			cast: [],
		};
		this.getCharacter = this.getCharacter.bind(this);
	}

	componentDidMount(){
		axios.get(`http://localhost:3030/book/${this.props.match.params.id}`)
			.then(res => {
				if (res.data.book.cast !== void 0) {
					let rawCast = res.data.book.cast.split(',');
					rawCast.map(member => this.getCharacter(member));
				}
				this.setState({ book: res.data.book });
			}
			);
	}

	getCharacter(id) {
		return axios.get(`http://localhost:3030/character/${id}`)
			.then(res => {
				this.setState({
					cast: [
						...this.state.cast,
						res.data.character
					]
				});
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
						<Link to="/books">{intl.get('entity.books')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						{this.state.book.title}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{this.state.book.title}
						<Header.Subheader>{this.state.book.series}</Header.Subheader>
					</Header>
					<Divider/>

					<p>
						<Icon name='info circle'/>{this.state.book.desc}
					</p>

					<Divider/>


					<Table celled striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan='3'>{intl.get('entity.characters')}</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{this.state.cast !== void 0 || this.state.cast.length > 0
								? this.state.cast.map(member => {
									return <Table.Row>
										<Table.Cell>
											<Link to={`/character/${member._id}`}>{member.first_name} {member.last_name}</Link>
										</Table.Cell>
									</Table.Row>;
								})
								: null
							}
						</Table.Body>
					</Table>
					<Divider/>
					<Button>
						{intl.get('book.action-edit')}
					</Button>
					<Button>
						{intl.get('book.action-delete')}
					</Button>
				</Segment>

			</Container>
		);
	}
}
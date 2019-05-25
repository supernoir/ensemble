import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Card, Divider, Button, Icon } from 'semantic-ui-react';

export default class Books extends React.Component {
	constructor(){
		super();
		this.state = {
			books: []
		};
	}
	componentDidMount(){
		axios.get('http://localhost:3030/books')
			.then(res => {
				this.setState({ books: res.data });
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
						<Link to="/books">{intl.get('entity.books')}</Link>
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{intl.get('entity.books')}
						<Header.Subheader>{intl.get('desc.books')}</Header.Subheader>
					</Header>
					<Divider/>
					<Button icon='add'>
						<Link to="/addbook">{intl.get('book.action-add')}</Link>
					</Button>

				</Segment>

				<Divider/>

				<Card.Group>
					{this.state.books.map(book => {
						return (
							<Card>
								<Card.Content>
									<Card.Header>
										<Link to={`/book/${book._id}`}>{book.title}</Link>
									</Card.Header>
									<Card.Meta>
										{book.series !== void 0
											? <h4>
												<b>{intl.get('entity.books.series')}</b>{' '}<Link to='/books/series/id'>{book.series}</Link>
											</h4>
											: null
										}
									</Card.Meta>
									<Card.Description>{book.desc}</Card.Description>
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
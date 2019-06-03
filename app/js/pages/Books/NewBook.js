import React from 'react';
import axios from 'axios';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Segment, Form, Button, Divider, Header, Breadcrumb, Dropdown } from 'semantic-ui-react';

export default class NewBook extends React.Component {
	constructor() {
		super();
		this.state = {
			title : '',
			genre : '',
			series: '',
			cast  : '',
			desc  : ''
		};
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(source, evt) {
		switch (source) {
			case 'title':
				this.setState({ title: evt.currentTarget.value });
				break;
			case 'series':
				this.setState({ series: evt.currentTarget.value });
				break;
			case 'genre':
				this.setState({ genre: evt.currentTarget.value });
				break;
			case 'desc':
				this.setState({ desc: evt.currentTarget.value });
				break;
			case 'cast':
				this.setState({ cast: evt.currentTarget.value });
				break;
			default:
				break;
		}
	}

	postNewBook(evt) {
		evt.preventDefault();
		axios
			.post('http://localhost:3030/book', {
				title : this.state.title,
				genre : this.state.genre,
				series: this.state.series,
				desc  : this.state.desc,
				cast  : this.state.cast
			})
			.catch(err => console.log(err));
		axios
			.post('http://localhost:3030/event', {
				user  : 'testAdmin',
				action: 'add_book',
				ref   : '',

			})
			.catch(err => console.log(err));
		this.props.history.push('/books');
	}

	render() {
		return (
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
						{intl.get('book.action-add')}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{intl.get('book.action-add')}
					</Header>

					<Divider/>

					<Form>
						<Form.Field>
							<label for="book" className="col-sm-2 control-label">{intl.get('book.label-title')}</label>
							<input
								onChange={evt => this.handleInput('title', evt)}
								type="text"
								className="form-control"
								id="title"
								placeholder="The Final Problem"
								required
							/>

						</Form.Field>
						<Form.Field>
							<label for="book" className="col-sm-2 control-label">{intl.get('book.label-genre')}</label>
							<select>
								{this.props.genres !== void 0 ? this.props.genres.map((genre,index) => {
									return <option key={`${genre}-${index}`}>{genre}</option>;
								}) : null}
							</select>
							<input onChange={evt => this.handleInput('genre', evt)} type="text" className="form-control" id="genre" placeholder="Crime, Suspense" />
						</Form.Field>
						<Form.Field>
							<label for="book" className="col-sm-2 control-label">{intl.get('book.label-series')}</label>
							<input
								onChange={evt => this.handleInput('series', evt)}
								type="text"
								className="form-control"
								id="series"
								placeholder="The Memoirs of Sherlock Holmes"
							/>
						</Form.Field>
						<Form.Field>
							<label for="book" className="col-sm-2 control-label">{intl.get('book.label-cast')}</label>
							<input
								onChange={evt => this.handleInput('cast', evt)}
								type="text"
								className="form-control"
								id="cast"
								placeholder="Sherlock Holmes, James Watson"
							/>
						</Form.Field>
						<label for="book" className="col-sm-2 control-label"><code>{intl.get('book.label-connectcharacters')}</code></label>
						<select className="form-control">
							<option ng-repeat="character in characters">{'character.first_name'} {'character.last_name'}</option>
						</select>
						<Form.Field>
							<Form.Field>

								<label for="book" className="col-sm-2 control-label">{intl.get('book.label-description')}</label>
								<input
									onChange={evt => this.handleInput('desc', evt)}
									type="text"
									className="form-control"
									id="desc"
									placeholder="The Adventures of Sherlock Holmes"
									required
								/>
							</Form.Field>

						</Form.Field>
						<Button onClick={evt => this.postNewBook(evt)} type="submit" className="btn btn-default">{intl.get('book.action-add')}</Button>
					</Form>

				</Segment>
			</Container>
		);
	}
}

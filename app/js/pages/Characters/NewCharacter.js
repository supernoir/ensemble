import React from 'react';
import axios from 'axios';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Segment, Form, Button, Divider, Header, Breadcrumb } from 'semantic-ui-react';

export default class NewCharacter extends React.Component {
	constructor() {
		super();
		this.state = {
			firstname: '',
			lastname : '',
			birthday : '',
			desc     : '',
			gender   : '',
			origin   : '',
			family   : '',
			book     : '',
			series   : '',
			imgurl   : ''
		};

		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(source, evt) {
		switch (source) {
			case 'firstname':
				this.setState({ firstname: evt.currentTarget.value });
				break;
			case 'lastname':
				this.setState({ lastname: evt.currentTarget.value });
				break;
			case 'gender':
				this.setState({ gender: evt.currentTarget.value });
				break;
			case 'birthday':
				this.setState({ age: evt.currentTarget.value });
				break;
			default:
				break;
		}
	}

	postnewCharacter(evt) {
		evt.preventDefault();
		axios
			.post('http://localhost:3030/character', {
				first_name: this.state.firstname,
				last_name : this.state.lastname,
				gender    : this.state.gender,
				birthday  : this.state.age,
				cast      : this.state.cast
			})
			.catch(err => console.log(err));
		this.props.history.push('/characters');
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
						<Link to="/characters">{intl.get('entity.characters')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						{intl.get('character.action-add')}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{intl.get('character.action-add')}
					</Header>

					<Divider/>

					<Form>
						<Form.Field>
							<label for="character">I18N First Name</label>
							<input onChange={evt => this.handleInput('firstname', evt)} type="text" id="firstname" placeholder="Jane" required />
						</Form.Field>
						<Form.Field>
							<label for="book">I18N Last Name</label>
							<input onChange={evt => this.handleInput('lastname', evt)} type="text" id="lastname" placeholder="Doe" />
						</Form.Field>
						<Form.Field>
							<label for="book" className="col-sm-2 control-label">I18N Gender</label>
							<input onChange={evt => this.handleInput('gender', evt)} type="text" className="form-control" id="gender" placeholder="Female" />
						</Form.Field>

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
						<Button onClick={evt => this.postnewCharacter(evt)} type="submit" className="btn btn-default">{intl.get('character.action-add')}</Button>
					</Form>

				</Segment>
			</Container>
		);
	}
}

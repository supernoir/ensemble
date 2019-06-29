import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Segment, Form, Button, Divider, Header, Breadcrumb } from 'semantic-ui-react';
import { addMessage } from '../../actions/addMessage';
export default class EditCharacter extends React.Component {
	constructor() {
		super();
		this.state = {
			firstname  : '',
			middlename : '',
			lastname   : '',
			birthday   : '',
			desc       : '',
			gender     : '',
			origin     : '',
			nationality: '',
			family     : '',
			project    : '',
			series     : '',
			imgurl     : ''
		};
	}

	handleInput = (source, evt) => {
		switch (source) {
			case 'firstname':
				this.setState({ firstname: evt.currentTarget.value });
				break;
			case 'middlename':
				this.setState({ middlename: evt.currentTarget.value });
				break;
			case 'lastname':
				this.setState({ lastname: evt.currentTarget.value });
				break;
			case 'gender':
				this.setState({ gender: evt.currentTarget.value });
				break;
			case 'birthday':
				this.setState({ birthday: evt.currentTarget.value });
				break;
			case 'origin':
				this.setState({ origin: evt.currentTarget.value });
				break;
			case 'project':
				this.setState({ project: evt.currentTarget.value });
				break;
			case 'desc':
				this.setState({ desc: evt.currentTarget.value });
				break;
			default:
				break;
		}
	};

	assembleFullName = (first, middle, last) => {
		try {
			let fullName = first !== void 0 && first.length > 0 ? first + ' ' : '';
			fullName += middle !== void 0 && middle.length > 0 ? middle + ' ' : '';
			fullName += last !== void 0 && last.length > 0 ? last : '';
			return fullName.trim();
		} catch (err) {
			throw err;
		}
	};

	postnewCharacter(evt) {
		evt.preventDefault();

		this.props.editCharacter(this.props.match.params.id, {
			desc       : this.state.desc,
			first_name : this.state.firstname,
			middle_name: this.state.middlename,
			last_name  : this.state.lastname,
			full_name  : this.assembleFullName(this.state.firstname, this.state.middlename, this.state.lastname),
			gender     : this.state.gender,
			birthday   : this.state.birthday,
			origin     : this.state.origin,
			project    : this.state.project
		});

		this.props.addEvent({
			user  : 'testAdmin',
			action: 'add_character',
			ref   : this.assembleFullName(this.state.firstname, this.state.middlename, this.state.lastname)
		});

		this.props.store.dispatch(
			addMessage({
				type   : 'success',
				content: intl.get('event.action-editcharacter', { ref: this.assembleFullName(this.state.firstname, this.state.middlename, this.state.lastname) })
			})
		);

		this.props.history.push('/characters');
	}

	componentDidMount() {
		this.assembleFullName();
		this.props.getCharacterById(this.props.match.params.id);
		this.props.getProjects();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			this.setState({
				first_name : nextProps.firstname,
				middle_name: nextProps.middlename,
				last_name  : nextProps.lastname,
				full_name  : nextProps.full_name,
				gender     : nextProps.gender,
				birthday   : nextProps.birthday,
				origin     : nextProps.origin,
				project    : nextProps.project
			});
		}
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
					<Breadcrumb.Section active>{intl.get('character.action-edit')}</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">{intl.get('character.action-edit')}</Header>

					<Divider />

					<Form>
						<Form.Field>
							<label for="desc">{intl.get('character.label-desc')}</label>
							<input
								onChange={evt => this.handleInput('desc', evt)}
								defaultValue={this.props.character.desc}
								type="text"
								id="desc"
								placeholder="A most loveable person"
							/>
						</Form.Field>
						<Form.Field>
							<label for="firstname">{intl.get('character.label-firstname')}</label>
							<input
								onChange={evt => this.handleInput('firstname', evt)}
								defaultValue={this.props.character.first_name}
								type="text"
								id="firstname"
								placeholder="Jane"
								required
							/>
						</Form.Field>
						<Form.Field>
							<label for="middlename">
								{intl.get('character.label-middlename')}
							</label>
							<input
								onChange={evt => this.handleInput('middlename', evt)}
								defaultValue={this.props.character.middle_name}
								type="text"
								id="middlename"
								placeholder="Agatha"
							/>
						</Form.Field>
						<Form.Field>
							<label for="lastname">
								{intl.get('character.label-lastname')}
							</label>
							<input
								onChange={evt => this.handleInput('lastname', evt)}
								defaultValue={this.props.character.last_name}
								type="text"
								id="lastname"
								placeholder="Doe"
							/>
						</Form.Field>
						<Form.Field>
							<label for="gender" className="col-sm-2 control-label">
								{intl.get('character.label-gender')}
							</label>
							<input
								onChange={evt => this.handleInput('gender', evt)}
								defaultValue={this.props.character.gender}
								type="text"
								className="form-control"
								id="gender"
								placeholder="Non-binary"
							/>
						</Form.Field>
						<Form.Field>
							<label for="origin" className="col-sm-2 control-label">
								{intl.get('character.label-origin')}
							</label>
							<input
								onChange={evt => this.handleInput('origin', evt)}
								defaultValue={this.props.character.origin}
								type="text"
								className="form-control"
								id="origin"
								placeholder="Wakanda"
							/>
						</Form.Field>
						<Form.Field>
							<label for="birthday" className="col-sm-2 control-label">
								{intl.get('character.label-birthday')}
							</label>
							<input
								onChange={evt => this.handleInput('birthday', evt)}
								defaultValue={this.props.character.birthday}
								type="text"
								className="form-control"
								id="birthday"
								placeholder="01-07-2019"
							/>
						</Form.Field>

						<Divider />

						<Form.Field>
							<label for="project" className="col-sm-2 control-label">
								{intl.get('entity.project')}
							</label>
							<select onChange={evt => this.handleInput('project', evt)}>
								{this.props.projects !== void 0
									? this.props.projects.map(project => {
										return (
											<option selected={this.props.character.project === project.id} value={project._id} key={`charoption-${project._id}`}>
												{project.title}
											</option>
										);
									})
									: null}
							</select>
						</Form.Field>

						<Button onClick={evt => this.postnewCharacter(evt)} type="submit" className="btn btn-default">
							{intl.get('character.action-add')}
						</Button>
					</Form>
				</Segment>
			</Container>
		);
	}
}

import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Segment, Form, Button, Divider, Header, Breadcrumb, Dropdown } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import PropTypes from 'prop-types';

/**
 * Class NewCharacter
 * Create new character
 */
export default class NewCharacter extends React.Component {
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
			projects   : [],
			series     : '',
			imgurl     : ''
		};
	}

	convertProjectToOptions = data => {
		return data !== void 0 && data.length > 0
			? data.map((val, key) => {
				return {
					key,
					text : val.title,
					value: val._id
				};
			})
			: [];
	}

	handleInput = (source, evt, val) => {
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
			case 'projects':
				this.setState({ projects: val });
				break;
			case 'desc':
				this.setState({ desc: evt.currentTarget.value });
				break;
			default:
				break;
		}
	}

	assembleFullName = (first, middle, last) => {
		try {
			let fullName = first !== void 0 && first.length > 0 ? first + ' ' : '';
			fullName += middle !== void 0 && middle.length > 0 ? middle + ' ' : '';
			fullName += last !== void 0 && last.length > 0 ? last : '';
			return fullName.trim();
		} catch (err) {
			throw err;
		}
	}

	postnewCharacter(evt) {
		evt.preventDefault();

		this.props.addCharacter({
			desc       : this.state.desc,
			first_name : this.state.firstname,
			middle_name: this.state.middlename,
			last_name  : this.state.lastname,
			full_name  : this.assembleFullName(this.state.firstname, this.state.middlename, this.state.lastname),
			gender     : this.state.gender,
			birthday   : this.state.birthday,
			origin     : this.state.origin,
			projects   : this.state.projects
		});

		this.props.addEvent({
			user  : 'testAdmin',
			action: 'add_character',
			ref   : this.assembleFullName(this.state.firstname, this.state.middlename, this.state.lastname)
		});

		this.props.history.push('/characters');
	}

	componentDidMount() {
		this.props.getProjects();
	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
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
						{intl.get('character.action-add')}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{intl.get('character.action-add')}
					</Header>

					<Divider />

					<Form>
						<Form.Field>
							<label htmlFor="desc">
								{intl.get('character.label-desc')}
							</label>
							<input onChange={evt => this.handleInput('desc', evt)} type="text" id="desc" placeholder="A most loveable person" />
						</Form.Field>
						<Form.Field>
							<label htmlFor="firstname">
								{intl.get('character.label-firstname')}
							</label>
							<input onChange={evt => this.handleInput('firstname', evt)} type="text" id="firstname" placeholder="Jane" required />
						</Form.Field>
						<Form.Field>
							<label htmlFor="middlename">
								{intl.get('character.label-middlename')}
							</label>
							<input onChange={evt => this.handleInput('middlename', evt)} type="text" id="middlename" placeholder="Agatha" />
						</Form.Field>
						<Form.Field>
							<label htmlFor="lastname">
								{intl.get('character.label-lastname')}
							</label>
							<input onChange={evt => this.handleInput('lastname', evt)} type="text" id="lastname" placeholder="Doe" />
						</Form.Field>
						<Form.Field>
							<label htmlFor="gender" className="col-sm-2 control-label">
								{intl.get('character.label-gender')}
							</label>
							<input onChange={evt => this.handleInput('gender', evt)} type="text" className="form-control" id="gender" placeholder="Non-binary" />
						</Form.Field>
						<Form.Field>
							<label htmlFor="origin" className="col-sm-2 control-label">
								{intl.get('character.label-origin')}
							</label>
							<input onChange={evt => this.handleInput('origin', evt)} type="text" className="form-control" id="origin" placeholder="Wakanda" />
						</Form.Field>
						<Form.Field>
							<label htmlFor="birthday" className="col-sm-2 control-label">
								{intl.get('character.label-birthday')}
							</label>
							<input onChange={evt => this.handleInput('birthday', evt)} type="date" className="form-control" id="birthday" placeholder="01-07-2019" />
						</Form.Field>

						<Divider />

						<Form.Field>
							<label htmlFor="projects" className="col-sm-2 control-label">{intl.get('entity.projects')}</label>

							<Dropdown
								placeholder="Projects"
								fluid
								multiple
								search
								selection
								onChange={(evt, { value }) => this.handleInput('projects', evt, value)}
								options={this.convertProjectToOptions(this.props.projects)}
							/>

						</Form.Field>

						<Form.Field>
							<label htmlFor="project" className="col-sm-2 control-label">
								{intl.get('entity.project')}
							</label>
							<select onChange={evt => this.handleInput('project', evt)}>
								{this.props.projects !== void 0
									? this.props.projects.map(project => {
										return <option value={project._id} key={`charoption-${project._id}`}>{project.title}</option>;
									})
									: null}
							</select>
						</Form.Field>

						<Button onClick={evt => this.postnewCharacter(evt)} type="submit" className="btn btn-default">
							{intl.get('character.action-add')}
						</Button>
					</Form>

				</Segment>
			</Container>;
	}
}

NewCharacter.propTypes = {
	loading     : PropTypes.bool,
	addCharacter: PropTypes.func,
	addEvent    : PropTypes.func,
	getProjects : PropTypes.func,
	projects    : PropTypes.arrayOf(
		PropTypes.shape({
			_id  : PropTypes.string,
			title: PropTypes.string
		})
	),
	history: PropTypes.object
};

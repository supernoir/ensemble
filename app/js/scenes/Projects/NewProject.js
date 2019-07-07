import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Segment, Form, Button, Divider, Header, Breadcrumb, Dropdown } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import { tagTypes } from '../../constants/tagTypes';
import { projectTypes } from '../../constants/projectTypes';

export default class NewProject extends React.Component {
	constructor() {
		super();
		this.state = {
			title       : '',
			genre       : '',
			series      : '',
			cast        : '',
			desc        : '',
			tags        : [],
			projectTypes: []
		};
	}

	handleInput = (source, evt) => {
		switch (source) {
			case 'type':
				this.setState({ type: evt.currentTarget.value });
				break;
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
			case 'tags':
				this.setState({
					tags: evt.currentTarget.value.split(',').map(item => item.trim())
				});
				break;
			default:
				break;
		}
	}

	postNewProject(evt) {
		evt.preventDefault();

		this.props.addProject({
			type  : this.state.type,
			title : this.state.title,
			genre : this.state.genre,
			series: this.state.series,
			desc  : this.state.desc,
			cast  : this.state.cast,
			tags  : this.state.tags,
		});

		if(this.state.tags !== void 0) {
			this.state.tags.forEach(tag => {
				this.props.addTag({
					type: tagTypes.PROJECT,
					name: tag,
					ref : this.state.title
				});

			});
		}

		this.props.addTag({
			type: tagTypes.PROJECT_TYPE,
			name: 	this.state.type,
			ref   : this.state.title
		});

		this.props.addEvent({
			user  : 'testAdmin',
			action: 'add_project',
			ref   : this.state.title,
		});

		this.props.history.push('/projects');
	}

	componentWillMount = () => {
		let types = [];
		for (let type in projectTypes) {
			types.push(projectTypes[type]);
		}
		this.setState({
			projectTypes: types
		});

	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			:	<Container>
				<Breadcrumb>
					<Breadcrumb.Section link>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section link>
						<Link to="/projects">{intl.get('entity.projects')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						{intl.get('project.action-add')}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{intl.get('project.action-add')}
					</Header>

					<Divider/>

					<Form>
						<Form.Field>
							<label htmlFor="type" className="col-sm-2 control-label">{intl.get('project.label-type')}</label>
							<select name="type"
								className={'ui search selection dropdown'}
								onChange={evt => this.handleInput('type', evt)}>
								{this.state.projectTypes !== void 0 && this.state.projectTypes.length > 0
									? this.state.projectTypes.map((type, index) => {
										return <option
											key={`${type}-${index}`}
											value={type}
										>
											{intl.get(`project.select-type-${type}`)}
										</option>;
									})
									: null
								}
							</select>
						</Form.Field>
						<Form.Field>
							<label for="project" className="col-sm-2 control-label">{intl.get('project.label-title')}</label>
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
							<label for="project" className="col-sm-2 control-label">{intl.get('project.label-genre')}</label>
							<input onChange={evt => this.handleInput('genre', evt)} type="text" className="form-control" id="genre" placeholder="Crime, Suspense" />
						</Form.Field>
						<Form.Field>
							<label for="project" className="col-sm-2 control-label">{intl.get('project.label-series')}</label>
							<input
								onChange={evt => this.handleInput('series', evt)}
								type="text"
								className="form-control"
								id="series"
								placeholder="The Memoirs of Sherlock Holmes"
							/>
						</Form.Field>
						<Form.Field>
							<label for="project" className="col-sm-2 control-label">{intl.get('project.label-cast')}</label>
							<input
								onChange={evt => this.handleInput('cast', evt)}
								type="text"
								className="form-control"
								id="cast"
								placeholder="Sherlock Holmes, James Watson"
							/>
						</Form.Field>
						<Form.Field>
							<label for="project" className="col-sm-2 control-label">{intl.get('project.label-description')}</label>
							<input
								onChange={evt => this.handleInput('desc', evt)}
								type="text"
								className="form-control"
								id="desc"
								placeholder="The Adventures of Sherlock Holmes"
								required
							/>
						</Form.Field>
						<Form.Field>
							<label for="project" className="col-sm-2 control-label">{intl.get('project.label-tags')}</label>
							<input onChange={evt => this.handleInput('tags', evt)} type="text" className="form-control" id="tags" placeholder="crime, noir" />
						</Form.Field>

						<Button onClick={evt => this.postNewProject(evt)} type="submit" className="btn btn-default">{intl.get('project.action-add')}</Button>
					</Form>

				</Segment>
			</Container>;
	}
}

import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Segment, Form, Button, Divider, Header, Breadcrumb } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import { tagTypes } from '../../constants/tagTypes';
import { projectTypes } from '../../constants/projectTypes';
import { projectStatus } from '../../constants/projectStatus';
import PropTypes from 'prop-types';

/**
 * Class EditProject
 * View for Editing a single project
 */
export default class EditProject extends React.Component {
	constructor() {
		super();
		this.state = {
			title        : '',
			status       : '',
			genres       : [],
			series       : '',
			cast         : [],
			desc         : '',
			tags         : [],
			projectTypes : [],
			projectStatus: [],
			project      : {}
		};
	}

	handleInput = (source, evt) => {
		switch (source) {
			case 'type':
				this.setState({ type: evt.currentTarget.value });
				break;
			case 'status':
				this.setState({ status: evt.currentTarget.value });
				break;
			case 'title':
				this.setState({ title: evt.currentTarget.value });
				break;
			case 'series':
				this.setState({ series: evt.currentTarget.value });
				break;
			case 'genres':
				this.setState({ genres: evt.currentTarget.value.split(',').map(item => item.trim()) });
				break;
			case 'desc':
				this.setState({ desc: evt.currentTarget.value });
				break;
			case 'cast':
				this.setState({ cast: evt.currentTarget.value.split(',').map(item => item.trim()) });
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

	postEditedProject(evt) {
		evt.preventDefault();

		this.props.editProject(this.props.match.params.id, {
			type  : this.state.type || this.props.project.type,
			status: this.state.status || this.props.project.status || projectStatus.DRAFT,
			title : this.state.title || this.props.project.title,
			genres: this.state.genres || this.props.project.genres,
			series: this.state.series || this.props.project.series,
			desc  : this.state.desc || this.props.project.desc,
			cast  : this.state.cast || this.props.project.cast,
			tags  : this.state.tags || this.props.project.tags
		});

		if (this.state.tags !== void 0) {
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
			name: this.state.type,
			ref : this.state.title
		});

		this.props.addEvent({
			user  : 'testAdmin',
			action: 'edit_project',
			ref   : this.state.title
		});

		this.props.history.push('/projects');
	}

	componentWillMount = () => {
		this.props.getProjectById(this.props.match.params.id);

		let types = [];
		let statuses = [];
		for (let type in projectTypes) {
			types.push(projectTypes[type]);
		}
		for (let status in projectStatus) {
			statuses.push(projectStatus[status]);
		}
		this.setState({
			projectTypes : types,
			projectStatus: statuses
		});
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
						<Link to="/projects">{intl.get('entity.projects')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						{intl.get('project.action-edit')}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{intl.get('project.action-edit')}
					</Header>

					<Divider />

					<Form>
						<Form.Field>
							<label htmlFor="type" className="col-sm-2 control-label">{intl.get('project.label-type')}</label>
							<select name="type" className={'ui search selection dropdown'} onChange={evt => this.handleInput('type', evt)}>
								{this.state.projectTypes !== void 0 && this.state.projectTypes.length > 0
									? this.state.projectTypes.map((type, index) => {
										return (
											<option key={`${type}-${index}`} value={type}>
												{intl.get(`project.select-type-${type}`)}
											</option>
										);
									})
									: null}
							</select>
						</Form.Field>
						<Form.Field>
							<label htmlFor="status" className="col-sm-2 control-label">{intl.get('project.label-status')}</label>
							<select name="status" className={'ui search selection dropdown'} onChange={evt => this.handleInput('status', evt)}>
								{this.state.projectStatus !== void 0 && this.state.projectStatus.length > 0
									? this.state.projectStatus.map((status, index) => {
										return (
											<option key={`${status}-${index}`} value={status}>
												{intl.get(`project.status-${status}`)}
											</option>
										);
									})
									: null}
							</select>
						</Form.Field>
						<Form.Field>
							<label htmlFor="project" className="col-sm-2 control-label">{intl.get('project.label-title')}</label>
							<input
								onChange={evt => this.handleInput('title', evt)}
								type="text"
								className="form-control"
								id="title"
								placeholder="The Final Problem"
								defaultValue={this.props.project.title}
								required
							/>
						</Form.Field>
						<Form.Field>
							<label htmlFor="project" className="col-sm-2 control-label">{intl.get('project.label-genres')}</label>
							<input
								onChange={evt => this.handleInput('genres', evt)}
								type="text"
								className="form-control"
								id="genres"
								placeholder="Crime, Suspense"
								defaultValue={this.props.project.genres !== void 0 ? this.props.project.genres.join(', ') : ''}
							/>
						</Form.Field>
						<Form.Field>
							<label htmlFor="project" className="col-sm-2 control-label">{intl.get('project.label-series')}</label>
							<input
								onChange={evt => this.handleInput('series', evt)}
								type="text"
								className="form-control"
								id="series"
								placeholder="The Memoirs of Sherlock Holmes"
								defaultValue={this.props.project.series}
							/>
						</Form.Field>
						<Form.Field>
							<label htmlFor="project" className="col-sm-2 control-label">{intl.get('project.label-cast')}</label>
							<input
								onChange={evt => this.handleInput('cast', evt)}
								type="text"
								className="form-control"
								id="cast"
								placeholder="Sherlock Holmes, James Watson"
								defaultValue={this.props.project.cast !== void 0 ? this.props.project.cast.join(', ') : ''}
							/>
						</Form.Field>
						<Form.Field>
							<label htmlFor="project" className="col-sm-2 control-label">{intl.get('project.label-description')}</label>
							<input
								onChange={evt => this.handleInput('desc', evt)}
								type="text"
								className="form-control"
								id="desc"
								placeholder="The Adventures of Sherlock Holmes"
								defaultValue={this.props.project.desc}
								required
							/>
						</Form.Field>
						<Form.Field>
							<label htmlFor="project" className="col-sm-2 control-label">{intl.get('project.label-tags')}</label>
							<input
								onChange={evt => this.handleInput('tags', evt)}
								type="text"
								className="form-control"
								id="tags"
								placeholder="crime, noir"
								defaultValue={this.props.project.tags !== void 0 ? this.props.project.tags.join(', ') : ''}
							/>
						</Form.Field>

						<Button onClick={evt => this.postEditedProject(evt)} type="submit" className="btn btn-default">{intl.get('project.action-edit')}</Button>
					</Form>

				</Segment>
			</Container>;
	}
}

EditProject.propTypes = {
	loading    : PropTypes.bool,
	history    : PropTypes.object,
	match      : PropTypes.object,
	editProject: PropTypes.func,
	addTag     : PropTypes.func,
	project    : PropTypes.shape({
		type  : PropTypes.string,
		status: PropTypes.string,
		title : PropTypes.string,
		genres: PropTypes.array,
		series: PropTypes.string,
		desc  : PropTypes.string,
		cast  : PropTypes.array,
		tags  : PropTypes.array
	})
};

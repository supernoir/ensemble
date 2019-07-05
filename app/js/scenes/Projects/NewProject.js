import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Segment, Form, Button, Divider, Header, Breadcrumb } from 'semantic-ui-react';
import Loader from '../../basics/Loader';

export default class NewProject extends React.Component {
	constructor() {
		super();
		this.state = {
			title : '',
			genre : '',
			series: '',
			cast  : '',
			desc  : '',
			tags  : []
		};
	}

	handleInput = (source, evt) => {
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
			title : this.state.title,
			genre : this.state.genre,
			series: this.state.series,
			desc  : this.state.desc,
			cast  : this.state.cast,
			tags  : this.state.tags
		});

		this.props.addEvent({
			user  : 'testAdmin',
			action: 'add_project',
			ref   : this.state.title,
		});

		this.props.history.push('/projects');
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
							<select>
								{this.props.genres !== void 0 ? this.props.genres.map((genre,index) => {
									return <option key={`${genre}-${index}`}>{genre}</option>;
								}) : null}
							</select>
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

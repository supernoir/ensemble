import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';
import { Container, Breadcrumb, Segment, Header, Card, Divider, Button, Label, Tab, Grid, Icon } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import DeleteModal from '../../basics/DeleteModal';
import { projectStatus } from '../../constants/projectStatus';

/**
 * Class ProjectsList
 * List of Projects
 */
export default class ProjectsList extends React.Component {
	constructor() {
		super();
		this.state = {
			showDeleteModal: false,
			projectId      : null
		};
	}

	componentDidMount() {
		this.props.getProjects();
	}

	/**
	 * deleteSpecificProject method
	 * triggers deleteSpecificProject with the given id
	 * @param {*} id The id of the specific project
	 */
	deleteSpecificProject(id) {
		this.props.deleteSpecificProject(id);
	}

	/**
	 * toggleDeleteModal method
	 * toggles showing/hiding the modal
	 */
	toggleDeleteModal = id => {
		this.setState({
			showDeleteModal: !this.state.showDeleteModal,
			projectId      : id
		});
	}

	/**
 * Method getProjectPanes
 * @param {object} props
 */
	getProjectPanes = props => {
		return [
			{
				menuItem: { key: 'overview', icon: 'th', content: intl.get('project.tab-overview') },
				render  : () => <Tab.Pane>{this.displayProjectOverview(props)}</Tab.Pane>
			},
			{
				menuItem: { key: 'board', icon: 'columns', content: intl.get('project.tab-board') },
				render  : () => <Tab.Pane>{this.displayProjectBoard(props)}</Tab.Pane>
			}
		];
	}

	displayProjectOverview = props => {
		return (
			<Card.Group>
				{props.projects !== void 0
					? props.projects.map((project, index) => {
						return (
							<Card key={`${project}-${index}`}>
								<Card.Content>
									<Card.Header>
										<Link to={`/project/${project._id}`}>{project.title}</Link>
										<Card.Meta>
											{project.type !== void 0 ? intl.get(`project.select-type-${project.type}`) : null}
										</Card.Meta>
									</Card.Header>
								</Card.Content>

								{project.series !== void 0 && project.series.length > 0
									? <Card.Content extra>
										<h4>
											<b>{intl.get('entity.projects.series')}</b>{' '}<Link to="/projects/series/id">{project.series}</Link>
										</h4>
									</Card.Content>
									: null}
								{project.desc !== void 0 && project.desc.length > 0
									? <Card.Content extra>
										<Card.Description>{project.desc}</Card.Description>
									</Card.Content>
									: null}

								{project.tags !== void 0 && project.tags.length > 0
									? <Card.Content extra>
										<Label.Group tag>
											{project.tags.map((tag, index) => {
												return <Label key={`${tag}-${index}`}>{tag}</Label>;
											})}
										</Label.Group>
									</Card.Content>
									: null}

								<Card.Content extra>
									<Link to={`/editproject/${project._id}`}>
										<Button circular basic icon="edit" color="blue" content={intl.get('app.edit')} />
									</Link>
									<Button circular basic
										icon="delete"
										color="red"
										onClick={() => this.toggleDeleteModal(project._id)} content={intl.get('app.delete')} />
								</Card.Content>
							</Card>
						);
					})
					: null}
			</Card.Group>
		);
	}

	/**
	 * Method displayProjectBoard
	 * @param {string} props
	 */
	displayProjectBoard = (props) => {
		return (
			<Grid columns="equal" divided relaxed>
				<Grid.Row>
					<Grid.Column textAlign="center">
						<Header>{intl.get('project.status-draft')}</Header>
						<Divider />
						{props.projects !== void 0
							? <Card.Group>
								{props.projects.map((project, index) => {
									return project.status === projectStatus.DRAFT
										? <Card key={`${project}-${index}`}>
											<Card.Content>
												<Card.Header>
													<Link to={`/project/${project._id}`}>{project.title}</Link>
												</Card.Header>
											</Card.Content>
											{project.type !== void 0
												? <Card.Content>
													<Card.Meta>
														{project.type !== void 0 ? intl.get(`project.select-type-${project.type}`) : null}
													</Card.Meta>
												</Card.Content>
												: null}
										</Card>
										: null;
								})}
							</Card.Group>
							: null}
					</Grid.Column>

					<Grid.Column textAlign="center">
						<Header>{intl.get('project.status-inprogress')}</Header>
						<Divider />
						{props.projects !== void 0
							? <Card.Group>
								{props.projects.map((project, index) => {
									return project.status === projectStatus.IN_PROGRESS
										? <Card key={`${project}-${index}`}>
											<Card.Content>
												<Card.Header>
													<Link to={`/project/${project._id}`}>{project.title}</Link>
												</Card.Header>
											</Card.Content>
											{project.type !== void 0
												? <Card.Content>
													<Card.Meta>
														{project.type !== void 0 ? intl.get(`project.select-type-${project.type}`) : null}
													</Card.Meta>
												</Card.Content>
												: null}
										</Card>
										: null;
								})}
							</Card.Group>
							: null}
					</Grid.Column>

					<Grid.Column textAlign="center">
						<Header>{intl.get('project.status-inreview')}</Header>
						<Divider />
						{props.projects !== void 0
							? <Card.Group>
								{props.projects.map((project, index) => {
									return project.status === projectStatus.IN_REVIEW
										? <Card key={`${project}-${index}`}>
											<Card.Content>
												<Card.Header>
													<Link to={`/project/${project._id}`}>{project.title}</Link>
												</Card.Header>
											</Card.Content>
											{project.type !== void 0
												? <Card.Content>
													<Card.Meta>
														{project.type !== void 0 ? intl.get(`project.select-type-${project.type}`) : null}
													</Card.Meta>
												</Card.Content>
												: null}
										</Card>
										: null;
								})}
							</Card.Group>
							: null}
					</Grid.Column>

					<Grid.Column textAlign="center">
						<Header>{intl.get('project.status-editing')}</Header>
						<Divider />
						{props.projects !== void 0
							? <Card.Group>
								{props.projects.map((project, index) => {
									return project.status === projectStatus.EDITING
										? <Card key={`${project}-${index}`}>
											<Card.Content>
												<Card.Header>
													<Link to={`/project/${project._id}`}>{project.title}</Link>
												</Card.Header>
											</Card.Content>
											{project.type !== void 0
												? <Card.Content>
													<Card.Meta>
														{project.type !== void 0 ? intl.get(`project.select-type-${project.type}`) : null}
													</Card.Meta>
												</Card.Content>
												: null}
										</Card>
										: null;
								})}
							</Card.Group>
							: null}
					</Grid.Column>

					<Grid.Column textAlign="center">
						<Header>{intl.get('project.status-published')}</Header>
						<Divider />
						{props.projects !== void 0
							? <Card.Group>
								{props.projects.map((project, index) => {
									return project.status === projectStatus.PUBLISHED
										? <Card key={`${project}-${index}`}>
											<Card.Content>
												<Card.Header>
													<Link to={`/project/${project._id}`}>{project.title}</Link>
												</Card.Header>
											</Card.Content>
											{project.type !== void 0
												? <Card.Content>
													<Card.Meta>
														{project.type !== void 0 ? intl.get(`project.select-type-${project.type}`) : null}
													</Card.Meta>
												</Card.Content>
												: null}
										</Card>
										: null;
								})}
							</Card.Group>
							: null}
					</Grid.Column>

				</Grid.Row>
			</Grid>
		);
	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
				{this.state.showDeleteModal
					? <DeleteModal
						open={this.state.showDeleteModal}
						close={this.toggleDeleteModal}
						entity={intl.get('entity.project')}
						ref={'testProject'}
						target={'/projects'}
						item={this.state.projectId}
						confirmDelete={id => this.props.deleteSpecificProject(id)}
					/>
					: null}
				<Breadcrumb>
					<Breadcrumb.Section>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						<Link to="/projects">{intl.get('entity.projects')}</Link>
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{intl.get('entity.projects')}
						<Header.Subheader>{intl.get('desc.projects')}</Header.Subheader>
					</Header>
					<Divider />
					<Button>
						<Icon name='add'/> <Link to="/addproject">{intl.get('project.action-add')}</Link>
					</Button>

				</Segment>

				<Divider />
				<Tab panes={this.getProjectPanes(this.props)} />
			</Container>;
	}
}

ProjectsList.propTypes = {
	loading              : PropTypes.bool,
	getProjects          : PropTypes.func,
	deleteSpecificProject: PropTypes.func
};


// Project PropTypes
/*
	projects             : PropTypes.shape({
		_id   : PropTypes.number,
		title : PropTypes.string,
		type  : PropTypes.string,
		status: PropTypes.string,
		series: PropTypes.string,
		desc  : PropTypes.string,
		tags  : PropTypes.array
	})
*/
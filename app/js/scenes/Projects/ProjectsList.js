import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Card, Divider, Button, Label } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import DeleteModal from '../../basics/DeleteModal';

export default class Projects extends React.Component {
	constructor(){
		super();
		this.state = {
			showDeleteModal: false,
			projectId      : null
		};
	}

	componentDidMount(){
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
	toggleDeleteModal = (id) => {
		this.setState({
			showDeleteModal: !this.state.showDeleteModal,
			projectId      : id
		});
	}

	render(){
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
				{
					this.state.showDeleteModal
						? <DeleteModal
							open={this.state.showDeleteModal}
							close={this.toggleDeleteModal}
							entity={intl.get('entity.project')}
							ref={'testProject'}
							target={'/projects'}
							item={this.state.projectId}
							confirmDelete={(id) => this.props.deleteSpecificProject(id)}
						/>
						: null
				}
				<Breadcrumb>
					<Breadcrumb.Section link>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						<Link to="/projects">{intl.get('entity.projects')}</Link>
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{intl.get('entity.projects')}
						<Header.Subheader>{intl.get('desc.projects')}</Header.Subheader>
					</Header>
					<Divider/>
					<Button icon='add'>
						<Link to="/addproject">{intl.get('project.action-add')}</Link>
					</Button>

				</Segment>

				<Divider/>

				<Card.Group>
					{this.props.projects !== void 0
						? this.props.projects.map(project => {
							return (
								<Card>
									<Card.Content>
										<Card.Header>
											<Link to={`/project/${project._id}`}>{project.title}</Link>
											<Card.Meta>
												{project.type !== void 0
													? intl.get(`project.select-type-${project.type}`)
													: null
												}
											</Card.Meta>
										</Card.Header>
									</Card.Content>

									{project.series !== void 0 && project.series.length > 0
										? <Card.Content extra>
											<h4>
												<b>{intl.get('entity.projects.series')}</b>{' '}<Link to='/projects/series/id'>{project.series}</Link>
											</h4>
										</Card.Content>
										: null
									}
									{project.desc !== void 0 && project.desc.length > 0
										? <Card.Content extra>
											<Card.Description>{project.desc}</Card.Description>
										</Card.Content>
										: null
									}

									{
										project.tags !== void 0 && project.tags.length > 0
											? <Card.Content extra><Label.Group tag>
												{project.tags.map((tag, index) => {
													return <Label key={`${tag}-${index}`}>{tag}</Label>;
												})}
											</Label.Group></Card.Content>
											: null
									}

									<Card.Content extra>
										<Button circular basic icon='edit' color='blue' content={intl.get('app.edit')}/>
										<Button circular basic icon='delete' color='red' onClick={() => this.toggleDeleteModal(project._id)} content={intl.get('app.delete')} />
									</Card.Content>
								</Card>
							);
						})
						: null
					}
				</Card.Group>
			</Container>;
	}
}
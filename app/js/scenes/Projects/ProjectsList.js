import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Card, Divider, Button } from 'semantic-ui-react';
import Loader from '../../layout/Loader';

export default class Projects extends React.Component {
	componentDidMount(){
		this.props.getProjects();
	}

	render(){
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
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
										</Card.Header>
										<Card.Meta>
											{project.series !== void 0
												? <h4>
													<b>{intl.get('entity.projects.series')}</b>{' '}<Link to='/projects/series/id'>{project.series}</Link>
												</h4>
												: null
											}
										</Card.Meta>
										<Card.Description>{project.desc}</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<Button circular icon='edit' color='green'/>
										<Button circular icon='delete' color='red'/>
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
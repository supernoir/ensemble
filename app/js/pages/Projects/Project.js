import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Table, Divider, Button, Icon } from 'semantic-ui-react';

export default class Project extends React.Component {

	componentDidMount(){
		this.props.getProjectById(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps !== this.props) {
			console.log(nextProps);
		}
	}

	render(){
		return(
			<Container>
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
						{this.props.project.title}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{this.props.project.title}
						<Header.Subheader>{this.props.project.series}</Header.Subheader>
					</Header>
					<Divider/>

					<p>
						<Icon name='info circle'/>{this.props.project.desc}
					</p>

					<Divider/>


					<Table celled striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan='3'>{intl.get('entity.characters')}</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{this.props.project.cast !== void 0
								? this.props.project.cast.map(member => {
									return <Table.Row>
										<Table.Cell>
											<Link to={`/character/${member.id}`}>{member.name}</Link>
										</Table.Cell>
									</Table.Row>;
								})
								:null
							}
						</Table.Body>
					</Table>
					<Divider/>
					<Button>
						{intl.get('project.action-edit')}
					</Button>
					<Button>
						{intl.get('project.action-delete')}
					</Button>
				</Segment>

			</Container>
		);
	}
}
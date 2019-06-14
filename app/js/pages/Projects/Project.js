import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Table, Divider, Button, Icon } from 'semantic-ui-react';

export default class Project extends React.Component {
	constructor(){
		super();
		this.state = {
			project: [],
			cast   : [],
		};
		this.getCharacter = this.getCharacter.bind(this);
	}

	componentDidMount(){
		axios.get(`http://localhost:3030/project/${this.props.match.params.id}`)
			.then(res => {
				if (res.data.project.cast !== void 0) {
					let rawCast = res.data.project.cast.split(',');
					rawCast.map(member => this.getCharacter(member));
				}
				this.setState({ project: res.data.project });
			}
			);
	}

	getCharacter(id) {
		return axios.get(`http://localhost:3030/character/${id}`)
			.then(res => {
				this.setState({
					cast: [
						...this.state.cast,
						res.data.character
					]
				});
			}
			);
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
						{this.state.project.title}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as='h2'>
						{this.state.project.title}
						<Header.Subheader>{this.state.project.series}</Header.Subheader>
					</Header>
					<Divider/>

					<p>
						<Icon name='info circle'/>{this.state.project.desc}
					</p>

					<Divider/>


					<Table celled striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan='3'>{intl.get('entity.characters')}</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{this.state.cast !== void 0 || this.state.cast.length > 0
								? this.state.cast.map(member => {
									return <Table.Row>
										<Table.Cell>
											<Link to={`/character/${member._id}`}>{member.first_name} {member.last_name}</Link>
										</Table.Cell>
									</Table.Row>;
								})
								: null
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
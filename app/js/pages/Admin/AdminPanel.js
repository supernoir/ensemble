import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, Header, Divider, Table, List } from 'semantic-ui-react';

export default class AdminPanel extends React.Component {

	constructor(){
		super();
		this.state = {
			api: {},
			db : {}
		};
	}
	componentDidMount(){
	//	console.log(this.props.adminData);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			this.setState({
				api: nextProps.adminData.api,
				db : nextProps.adminData.db
			});
			//console.log(nextProps.adminData.api.map(entry => entry));
		}
	}

	render() {
		return (
			<Container>
				<Breadcrumb>
					<Breadcrumb.Section active>
						{'I18N: Admin Panel'}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{'I18N: Admin Panel'}
					</Header>
					<Divider />
				</Segment>



				{this.props.adminData.api
					? this.props.adminData.api.map(entry => {
						return <Segment>
							<Header as="h3">
								{'API'}
							</Header>
							<Table celled striped>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>{'Type'}</Table.HeaderCell>
										<Table.HeaderCell>{'Status'}</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									<Table.Row>
										<Table.Cell collapsing>
											{'API Version'}
										</Table.Cell>
										<Table.Cell>{entry.version}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell collapsing>
											{'API Uptime'}
										</Table.Cell>
										<Table.Cell>{entry.uptime}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell collapsing>
											{'API Logs'}
										</Table.Cell>
										<Table.Cell>
											<List divided>
												{entry.logs.map(log => {
													return <List.Item>{log}</List.Item>;
												})}
											</List>
										</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
						</Segment>;
					})
					: null
				}

				{this.props.adminData.db
					? this.props.adminData.db.map(entry => {
						return <Segment>
							<Header as="h3">
								{'Database'}
							</Header>
							<Table celled striped>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>{'Type'}</Table.HeaderCell>
										<Table.HeaderCell>{'Status'}</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									<Table.Row>
										<Table.Cell collapsing>
											{'DB Status'}
										</Table.Cell>
										<Table.Cell>{entry.status}</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
						</Segment>;
					})
					: null
				}

			</Container>
		);
	}
}

import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Container, Segment, Header, Divider, Card, Feed } from 'semantic-ui-react';
import Loader from '../basics/Loader';

export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			eventsData   : [],
			dashboardData: []
		};
	}

	parseEvent = event => {
		switch (event.action) {
			case 'add_project':
				return intl.get('event.action-addproject', { ref: event.ref });
			case 'add_character':
				return intl.get('event.action-addcharacter', { ref: event.ref });
			case 'edit_project':
				return intl.get('event.action-editproject', { ref: event.ref });
			case 'edit_character':
				return intl.get('event.action-editcharacter', { ref: event.ref });
			case 'delete_project':
				return intl.get('event.action-deletecharacter', { ref: event.ref });
			case 'delete_character':
				return intl.get('event.action-deletecharacter', { ref: event.ref });
		}
	};

	componentDidMount() {
		this.props.getEvents();
		this.props.getDashboardData();
	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
				<Segment>
					<Header>
						{intl.get('component.dashboard')}
					</Header>
					<Divider />
					<Card.Group>
						<Card
							onClick={() => this.props.history.push('/projects')}
							image={'../../public/img/photo-1443188631128-a1b6b1c5c207.jpeg'}
							header={intl.get('entity.projects')}
							meta={intl.get('project.count-available', {
								count: this.props.dashboardData ? this.props.dashboardData.projects : 0
							 })}
						/>
						<Card
							onClick={() => this.props.history.push('/characters')}
							image={'../../public/img/photo-1427805371062-cacdd21273f1.jpeg'}
							header={intl.get('entity.characters')}
							meta={intl.get('character.count-available', {
								count: this.props.dashboardData ? this.props.dashboardData.characters : 0
							})}
						/>
					</Card.Group>
					<Header>
						<Link to="/events">{intl.get('event.recent-activity')}</Link>
						<Divider />

						{this.props.eventsData
							? this.props.eventsData.map(event => {
								return (
									<Feed>
										<Feed.Event>
											<Feed.Label image={'../../public/img/protouser.png'} />
											<Feed.Content>
												<Feed.Date>{moment(event.timestamp, 'X').format('lll')}</Feed.Date>
												<Feed.Summary>
													{this.parseEvent(event)}
												</Feed.Summary>
											</Feed.Content>
										</Feed.Event>
									</Feed>
								);
							})
							: null}

					</Header>
				</Segment>
			</Container>;
	}
}

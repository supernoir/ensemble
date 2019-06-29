import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Container, Segment, Header, Divider, Card, Feed } from 'semantic-ui-react';

export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			eventsData: []
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
	}

	render() {
		return (
			<Container>
				<Segment>
					<Header>
						{intl.get('component.dashboard')}
					</Header>
					<Divider />
					<Card.Group>
						<Card
							href="/projects"
							image={'../../public/img/photo-1443188631128-a1b6b1c5c207.jpeg'}
							header={intl.get('entity.projects')}
							meta={intl.get('project.count-available', { count: 12 })}
						/>
						<Card
							href="/characters"
							image={'../../public/img/photo-1427805371062-cacdd21273f1.jpeg'}
							header={intl.get('entity.characters')}
							meta={intl.get('character.count-available', { count: 2 })}
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
			</Container>
		);
	}
}
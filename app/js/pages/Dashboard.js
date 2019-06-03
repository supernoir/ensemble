import React from 'react';
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

	componentDidMount() {}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			console.log(nextProps.eventsData);
		}
	}

	parseEvent = event => {
		switch (event.action) {
			case 'add_book':
				return `You added ${event.ref} to your books.`;
			case 'add_character':
				return `You added ${event.ref} to your Characters.`;
			case 'edit_book':
			case 'edit_character':
				return `You edited ${event.ref}`;
		}
	};



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
							href="/books"
							image={'../../public/img/photo-1443188631128-a1b6b1c5c207.jpeg'}
							header={intl.get('entity.books')}
							meta={`12 Books available`}
						/>
						<Card
							href="/characters"
							image={'../../public/img/photo-1427805371062-cacdd21273f1.jpeg'}
							header={intl.get('entity.characters')}
							meta={`4 Characters available`}
						/>
					</Card.Group>
					<Header>
						{'I18N: Recent Activity'}
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

import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Feed, Divider, Icon } from 'semantic-ui-react';
import moment from 'moment';

export default class EventsList extends React.Component {
	parseEvent = event => {
		switch (event.action) {
			case 'add_project':
				return `You added ${event.ref} to your projects.`;
			case 'add_character':
				return `You added ${event.ref} to your Characters.`;
			case 'edit_project':
			case 'edit_character':
				return `You edited ${event.ref}`;
		}
	};

	componentDidMount() {
		this.props.getEvents();
	}

	render() {
		return (
			<Container>
				<Breadcrumb>
					<Breadcrumb.Section link>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						<Link to="/projects">{intl.get('entity.events')}</Link>
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{intl.get('entity.events')}
						<Icon name="newspaper outline"></Icon>
						<Header.Subheader>{intl.get('desc.events')}</Header.Subheader>
					</Header>
				</Segment>

				<Divider />

				{this.props.events
					? this.props.events.map(event => {
						return (
							<Feed>
								<Feed.Event>
									<Feed.Label image={'../../public/img/protouser.png'} />
									<Feed.Content>
										<Feed.Date>{moment(event.timestamp, 'X').format('lll')}</Feed.Date>
										<Feed.Summary>{this.parseEvent(event)}</Feed.Summary>
									</Feed.Content>
								</Feed.Event>
							</Feed>
						);
					  })
					: null}
			</Container>
		);
	}
}

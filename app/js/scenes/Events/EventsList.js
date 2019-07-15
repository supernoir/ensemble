import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Feed, Divider } from 'semantic-ui-react';
import moment from 'moment';
import Loader from '../../basics/Loader';
import PropTypes from 'prop-types';

/**
 * Class EventsList
 * List of events
 */
export default class EventsList extends React.Component {
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
			default: break;
		}
	};

	componentDidMount() {
		this.props.getEvents();
	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			:	<Container>
				<Breadcrumb>
					<Breadcrumb.Section>
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
						<Header.Subheader>{intl.get('desc.events')}</Header.Subheader>
					</Header>
				</Segment>

				<Divider />

				{this.props.events
					? this.props.events.map((event, index) => {
						return (
							<Feed key={`feed-${index}`}>
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
			</Container>;
	}
}

EventsList.propTypes = {
	loading  : PropTypes.bool,
	getEvents: PropTypes.func,
	events   : PropTypes.arrayOf(
		PropTypes.shape({
			timestamp: PropTypes.timestamp,
			action   : PropTypes.string,
			ref      : PropTypes.string
		})
	)
};
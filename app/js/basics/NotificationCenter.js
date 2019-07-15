import React from 'react';
import Notification from './Notification';
import PropTypes from 'prop-types';

const MESSAGES_LIMIT = 5;

/**
 * Class NotificationCenter
 * Wrapping component to handle a set of notifications
 */
export default class NotificationCenter extends React.Component {
	renderNotifications = messages => {
		return (
			<div className="app_notification-container">
				{messages.map((message, index) => {
					return <Notification key={`${message.type}-${index}`} type={message.type} content={message.content} description={message.description} />;
				})}
			</div>
		);
	};

	render() {
		if (this.props.messages !== void 0) {
			if (this.props.messages.length < MESSAGES_LIMIT) {
				return this.renderNotifications(this.props.messages);
			} else {
				this.props.messages.shift();
				return this.renderNotifications(this.props.messages);
			}
		} else {
			return null;
		}
	}
}

NotificationCenter.propTypes = {
	messages: PropTypes.shape({
		type       : PropTypes.string,
		content    : PropTypes.string,
		description: PropTypes.string
	})
};
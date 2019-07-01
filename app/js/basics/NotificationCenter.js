import React from 'react';
import Notification from './Notification';

const MESSAGES_LIMIT = 5;

export default class NotificationCenter extends React.Component {
	renderNotifications = messages => {
		return (
			<div className="app_notification-container">
				{messages.map(message => {
					return <Notification type={message.type} content={message.content} description={message.description} />;
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

import React from 'react';
import { Message } from 'semantic-ui-react';
import { notificationTypes } from '../constants/notificationTypes';

export default class Notification extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: true
		};
	}

	parseNotificationType = type => {
		switch (type) {
			case notificationTypes.INFO:
				return notificationTypes.INFO;
			case notificationTypes.WARN:
				return notificationTypes.WARN;
			case notificationTypes.ERROR:
				return notificationTypes.ERROR;
			case notificationTypes.SUCCESS:
				return notificationTypes.SUCCESS;
			default:
				return '';
		}
	};

	handleDismiss = () => {
		this.setState({ visible: false });

		setTimeout(() => {
			this.setState({ visible: true });
		}, 2000);
	};

	render() {
		return (
			<Message className={this.props.type} onDismiss={this.handleDismiss}>
				<Message.Header>{this.props.content}</Message.Header>
				<p>{this.props.description}</p>
			</Message>
		);
	}
}

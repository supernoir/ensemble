import React from 'react';
import { shallow } from 'enzyme';
import { notificationTypes } from '../../../js/constants/notificationTypes';

const testData = {
	type       : notificationTypes.ERROR,
	content    : 'A test error occurred',
	description: 'Something went wrong'
};

// Import Components
import Notification from '../../../js/basics/Notification';

test('Notification -- Snapshot Test', () => {
	const wrapper = shallow(<Notification
		type={testData.type}
		content={testData.content}
		description={testData.description}
	/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('Notification -- Types Tests', () => {
	const NotificationWithError = shallow(<Notification type={notificationTypes.ERROR} />);
	expect(NotificationWithError.find('.error')).toHaveLength(1);
	const NotificationWithWarning = shallow(<Notification type={notificationTypes.WARN} />);
	expect(NotificationWithWarning.find('.warning')).toHaveLength(1);
	const NotificationWithSuccess = shallow(<Notification type={notificationTypes.SUCCESS} />);
	expect(NotificationWithSuccess.find('.success')).toHaveLength(1);
	const NotificationWithInfo = shallow(<Notification type={notificationTypes.INFO} />);
	expect(NotificationWithInfo.find('.info')).toHaveLength(1);
});

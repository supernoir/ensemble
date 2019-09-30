import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { notificationTypes } from '../../../js/constants/notificationTypes';
import { Provider } from 'react-redux';

const testData = {
	messages: [
		{
			type       : notificationTypes.ERROR,
			content    : 'A test error occurred',
			description: 'Something went wrong'
		},
		{
			type       : notificationTypes.WARN,
			content    : 'A test warning occurred',
			description: 'Something went wrong'
		},
		{
			type       : notificationTypes.INFO,
			content: 'Here be dragons',
		},
		{
			type       : notificationTypes.SUCCESS,
			content    : 'Yay you did it!',
			description: 'A job well done'
		},
	],
	store: {
		dispatch : jest.fn(),
		getState : jest.fn(),
		subscribe: jest.fn()
	}
};

// Import Components
import NotificationCenter from '../../../js/containers/MessengerContainer';

test('NotificationCenter -- Snapshot Test', () => {
	const wrapper = shallow(<Provider store={testData.store}>
		<NotificationCenter messages={testData.messages} />
	</Provider>
	);
	expect(wrapper).toMatchSnapshot();
});

/* test('NotificationCenter -- Type Test', () => {
	const wrapper = render(<Provider store={testData.store}>
		<NotificationCenter messages={testData.messages} />
	</Provider>
	);
	expect(wrapper.find(NotificationCenter).children()).toHaveLength(4);
}); */

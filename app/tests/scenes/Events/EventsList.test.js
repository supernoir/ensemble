import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import EventsList from '../../../js/scenes/Events/EventsList';

test('EventsList -- Snapshot Test', () => {
	const wrapper = shallow(<EventsList getEvents={() => true} />);
	expect(wrapper).toMatchSnapshot();
});

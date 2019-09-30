import React from 'react';
import { shallow } from 'enzyme';

const testData = {
	setCurrentLocale: jest.fn(),
};

// Import Components
import Navbar from '../../../js/basics/Navbar';

test('Navbar -- Snapshot Test', () => {
	const wrapper = shallow(<Navbar
		close={() => testData.setCurrentLocale()}
	/>
	);
	expect(wrapper).toMatchSnapshot();
});

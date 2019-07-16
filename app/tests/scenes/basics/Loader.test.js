import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import Loader from '../../../js/basics/Loader';

test('Loader -- Snapshot Test', () => {
	const wrapper = shallow(<Loader	/>
	);
	expect(wrapper).toMatchSnapshot();
});

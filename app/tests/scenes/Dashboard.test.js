import React from 'react';
import { shallow } from 'enzyme';
import intl from 'react-intl-universal';

// Import Components
import Dashboard from './../../js/scenes/Dashboard';

// Initialize React-Intl-Universal with TestData
intl.init({
	currentLocale: 'en-US',
	locales      : 	{
		'en-US': require('./../../js/data/locales/en-US.json')
	},
});

test('Dashboard -- Snapshot Test', () => {
	const wrapper = shallow(<Dashboard getEvents={() => true} getDashboardData={() => true} />);
	expect(wrapper).toMatchSnapshot();
});

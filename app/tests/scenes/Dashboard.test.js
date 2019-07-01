import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import Dashboard from './../../js/scenes/Dashboard';
import Loader from '../../js/basics/Loader';

// Import Mock Data
//import * as mockData from './mocks/mockApiResponse.json';

test('Dashboard -- Snapshot Test', () => {
	const wrapper = shallow(<Dashboard getEvents={() => true} getDashboardData={() => true} />);
	expect(wrapper).toMatchSnapshot();
});
/*
describe('Dashboard', function() {
	it('should render a loader', function() {
		expect(shallow(<Dashboard getEvents={() => true} getDashboardData={() => true} loading={true} />).contains(<Loader />)).toBe(true);
	});
}); */

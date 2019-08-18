import React from 'react';
import { shallow } from 'enzyme';

// Import Mocks
import mockProject from '../../mocks/mockProject';

// Import Components
import EditProject from '../../../js/scenes/Projects/EditProject';

test('EditProject -- Snapshot Test', () => {
	const wrapper = shallow(
		<EditProject
			loading={false}
			editProject={(id, data) => {
				jest.fn(id, data);
			}}
			getProjectById={id => jest.fn(id)}
			project={mockProject}
			addEvent={data => {
				jest.fn(data);
			}}
			addTag={data => {
				jest.fn(data);
			}}
			match={{ params: 1 }}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

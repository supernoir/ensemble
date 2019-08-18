import React from 'react';
import { shallow } from 'enzyme';

// Import Mocks
import mockProject from '../../mocks/mockProject';

// Import Components
import Project from '../../../js/scenes/Projects/Project';

test('Project -- Snapshot Test', () => {
	const wrapper = shallow(
		<Project
			loading={false}
			match={{ params: 1 }}
			getProjectById={id => jest.fn(id)}
			project={mockProject}
			deleteSpecificProject={id => {
				jest.fn(id);
			}}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

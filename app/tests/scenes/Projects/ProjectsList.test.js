import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import ProjectsList from '../../../js/scenes/Projects/ProjectsList';

test('ProjectsList -- Snapshot Test', () => {
	const wrapper = shallow(
		<ProjectsList loading={() => jest.fn(false)} getProjects={() => jest.fn([])} deleteSpecificProject={id => jest.fn(id)} projects={[]} />
	);
	expect(wrapper).toMatchSnapshot();
});

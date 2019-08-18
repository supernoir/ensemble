import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import NewProject from '../../../js/scenes/Projects/NewProject';

test('NewProject -- Snapshot Test', () => {
	const wrapper = shallow(
		<NewProject
			loading={false}
			genres={[]}
			addProject={data => {
				jest.fn(data);
			}}
			addEvent={data => {
				jest.fn(data);
			}}
			addTag={data => {
				jest.fn(data);
			}}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

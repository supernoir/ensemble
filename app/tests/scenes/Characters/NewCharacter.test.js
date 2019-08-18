import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import NewCharacter from '../../../js/scenes/Characters/NewCharacter';

test('NewCharacter -- Snapshot Test', () => {
	const wrapper = shallow(
		<NewCharacter
			loading={false}
			addCharacter={data => {
				jest.fn(data);
			}}
			getProjects={() => jest.fn()}
			projects={[]}
			getProjectById={id => jest.fn(id)}
			project={{}}
			addEvent={data => {
				jest.fn(data);
			}}
			match={{ params: { id: 1 } }}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

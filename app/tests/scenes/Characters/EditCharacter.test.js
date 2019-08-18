import React from 'react';
import { shallow } from 'enzyme';

// Import Mocks
import mockCharacter from '../../mocks/mockCharacter';

// Import Components
import EditCharacter from '../../../js/scenes/Characters/EditCharacter';

test('EditCharacter -- Snapshot Test', () => {
	const wrapper = shallow(
		<EditCharacter
			loading={false}
			editCharacter={(id, data) => {
				jest.fn(id, data);
			}}
			getCharacterById={id => jest.fn(id)}
			character={mockCharacter}
			getProjects={() => jest.fn()}
			projects={[]}
			addEvent={data => {
				jest.fn(data);
			}}
			match={{ params: { id: 1 } }}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

// Import Mocks
import mockProject from '../../mocks/mockProject';
import mockCharacter from '../../mocks/mockCharacter';

// Import Components
import Character from '../../../js/scenes/Characters/Character';

test('Project -- Snapshot Test', () => {
	const wrapper = shallow(
		<Character
			loading={false}
			getCharacterById={id => jest.fn(id)}
			project={mockProject}
			character={mockCharacter}
			deleteSpecificCharacter={id => jest.fn(id)}
			match={{ params: { id: 1 } }}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

// Import Mocks
import mockProject from '../../mocks/mockProject';
import mockCharacters from '../../mocks/mockCharacters';

// Import Components
import CharactersList from '../../../js/scenes/Characters/CharactersList';

test('CharactersList -- Snapshot Test', () => {
	const wrapper = shallow(
		<CharactersList
			loading={false}
			getCharacters={() => jest.fn()}
			characters={mockCharacters}
			getProjectById={id => jest.fn(id)}
			deleteSpecificCharacter={id => {
				jest.fn(id);
			}}
			project={mockProject}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

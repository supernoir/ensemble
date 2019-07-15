import React from 'react';
import { shallow } from 'enzyme';

const testData = {
	projectTitle   : 'TestTitle',
	getProjectTitle: jest.fn(),
	character      : {
		_id      : 1,
		project  : 2,
		desc     : 'TestDescription',
		gender   : 'TestGender',
		birthday : '01/01/1990',
		full_name: 'TestName'
	}
};

// Import Components
import CharacterCard from '../../../js/basics/CharacterCard';

test('CharacterCard -- Snapshot Test', () => {
	const wrapper = shallow(<CharacterCard
		getProjectTitle={() => testData.getProjectTitle()}
		character={testData.character}
		projectTitle={testData.projectTitle}
	/>
	);
	expect(wrapper).toMatchSnapshot();
});

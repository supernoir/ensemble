

import React from 'react';
import { shallow } from 'enzyme';

const testData = {
	close        : jest.fn(),
	open         : jest.fn(),
	confirmDelete: jest.fn(),
	entity       : 'Project',
	item         : 'TestProject',
	target       : '/projects'
};

// Import Components
import DeleteModal from '../../../js/basics/DeleteModal';

test('DeleteModal -- Snapshot Test', () => {
	const wrapper = shallow(<DeleteModal
		close={() => testData.getProjectTitle()}
		open={() => testData.getProjectTitle()}
		confirmDelete={() => testData.getProjectTitle()}
		entity={testData.entity}
		item={testData.item}
		target={testData.target}
	/>
	);
	expect(wrapper).toMatchSnapshot();
});

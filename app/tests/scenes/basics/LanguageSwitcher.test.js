import React from 'react';
import { shallow } from 'enzyme';

const testData = {
	setCurrentLocale: jest.fn()
};

// Import Components
import LanguageSwitcher from '../../../js/basics/LanguageSwitcher';

test('LanguageSwitcher -- Snapshot Test', () => {
	const wrapper = shallow(<LanguageSwitcher
		setCurrentLocale={() => testData.setCurrentLocale()}
	/>
	);
	expect(wrapper).toMatchSnapshot();
});

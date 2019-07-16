import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import TagsList from '../../../js/scenes/Tags/TagsList';

test('TagsList -- Snapshot Test', () => {
	const wrapper = shallow(<TagsList getTags={() => true} />);
	expect(wrapper).toMatchSnapshot();
});

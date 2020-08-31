import React from 'react';
import renderer from 'react-test-renderer';

import Entry from './AppEntry';

describe('<Entry />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Entry />).toJSON();
        expect(tree.children.length).toBe(1);
        // expect(tree).toMatchSnapshot();
    });
});

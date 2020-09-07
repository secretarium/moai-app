import React from 'react';
import renderer from 'react-test-renderer';

import About from '../About';

describe('<About />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<About />).toJSON();
        expect(tree.children.length).toBe(1);
        expect(tree).toMatchSnapshot();
    });
});

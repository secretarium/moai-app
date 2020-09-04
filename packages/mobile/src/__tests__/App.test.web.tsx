import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../Providers';
import App from '../App';

describe('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(
            <Providers>
                <App />
            </Providers>).toJSON();
        expect(tree.children.length).toBe(1);
        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import Providers from '../Providers';

describe('<Providers />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Providers>
            <Text>Test</Text>
        </Providers>).toJSON();
        expect(tree.children.length).toBe(1);
        expect(tree).toMatchSnapshot();
    });
});

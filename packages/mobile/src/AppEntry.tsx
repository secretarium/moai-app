import React from 'react';
import { registerRootComponent } from 'expo';
import Providers from './Providers';

const Entry: React.FC = () => (
    <Providers />
);

registerRootComponent(Entry);

export default Entry;
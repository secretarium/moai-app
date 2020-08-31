import React from 'react';
import { registerRootComponent } from 'expo';
import App from './App';
import Providers from './Providers';

const Entry: React.FC = () => (
    <Providers>
        <App />
    </Providers>
);

registerRootComponent(Entry);

export default Entry;
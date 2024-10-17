/// <reference types="react/canary" />
"use client";

import { FC } from 'react';
import App from './src/App';
import Providers from './src/Providers';
// import { registerRootComponent } from 'expo';

const Entry: FC = () => (
    <Providers>
        <App />
    </Providers>
);

// registerRootComponent(Entry);

export default Entry;
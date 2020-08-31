import React from 'react';
import { Router } from './react-router';
import Navigation from './Navigation';

const Providers: React.FC = () => (
    <Router>
        <Navigation />
    </Router>
);

export default Providers;
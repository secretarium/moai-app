import React from 'react';
import { Router } from './ReactRouter';

const Providers: React.FC = ({ children }) => (
    <Router>
        {children}
    </Router>
);

export default Providers;
import React from 'react';
import { Router } from './react-router';

const Providers: React.FC = ({ children }) => (
    <Router>
        {children}
    </Router>
);

export default Providers;
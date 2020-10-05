import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers: React.FC = ({ children }) => (
    <Router>
        {children}
    </Router>
);


export default Providers

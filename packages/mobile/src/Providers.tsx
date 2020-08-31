import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Router } from './react-router';
import { apolloClient } from './apollo';
import Navigation from './Navigation';

const Providers: React.FC = () => (
    <ApolloProvider client={apolloClient}>
        <Router>
            <Navigation />
        </Router>
    </ApolloProvider>
);

export default Providers;
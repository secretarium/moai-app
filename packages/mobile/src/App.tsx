import React from 'react';
import { Route } from './ReactRouter';
import Home from './Home';
import About from './About';

const App: React.FC = () => (
    <>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
    </>
);

export default App;
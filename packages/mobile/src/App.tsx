import React from 'react';
import { Route } from './ReactRouter';
import Home from './Home';
import About from './About';
import Chat from './components/Chat';
import Scanner from './components/Scanner';

const App: React.FC = () => (
    <>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/chat" component={Chat} />
        <Route path="/scanner" component={Scanner} />
    </>
);

export default App;

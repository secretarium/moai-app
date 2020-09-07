import React from 'react';
import { Route } from './ReactRouter';
import WelcomeScreen from './components/WelcomeScreen';
import About from './About';
import Chat from './pages/Chat/Chat';

const App: React.FC = () => (
    <>
        <Route exact path="/" component={WelcomeScreen} />
        <Route path="/about" component={About} />
        <Route path="/chat" component={Chat} />
    </>
);
export default App;

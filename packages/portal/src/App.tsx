import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

const App: React.FC = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
    </Switch>
);


export default App;

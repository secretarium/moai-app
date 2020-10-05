import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Providers from './Providers';
import Login from './components/Login';
import Home from './components/Home';

const App: React.FC = () => (
    <Providers>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
        </Switch>
    </Providers>
);


export default App;

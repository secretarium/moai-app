import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Providers from './Providers';
import Login from './components/Login';
import Chat from './components/Chat';
import Body from './components/Body';


const App: React.FC = () => {
    return (
        <Providers>
            <Body>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/chat" component={Chat} />
                </Switch>
            </Body>
        </Providers>
    );
};



export default App;


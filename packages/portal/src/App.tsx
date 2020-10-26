import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Providers from './Providers';
import Login from './components/Login';
import Chat from './components/Chat';
import Body from './components/Body';
import SearchCode from './components/SearchCode';
import Home from './components/Home';
import Menu from './components/Menu';
import Settings from './components/Settings';
import { NotLoggedIn, LoggedIn } from './components/Login/LoginStatusSwitch';
import './App.css';


const App: React.FC = () => {
    return (
        <Providers>
            <Body>
                <NotLoggedIn>
                    <Login />
                </NotLoggedIn>
                <LoggedIn>
                    <div className="container">
                        <Menu />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/search/:code?" component={SearchCode} />
                            <Route path="/chat/:id?" component={Chat} />
                            <Route path="/settings" component={Settings} />
                        </Switch>
                    </div>
                </LoggedIn>
            </Body>
        </Providers>
    );
};



export default App;


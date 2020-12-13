import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Providers from './Providers';
import Login from './components/Login';
import Chat from './components/Chat';
import Body from './components/Body';
import SearchExposed from './components/SearchCode/SearchExposed';
import SearchTested from './components/SearchCode/SearchTested';
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
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route render={() => <Redirect to="/login" />} />
                    </Switch>
                </NotLoggedIn>
                <LoggedIn>
                    <div className="container">
                        <Menu />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/search/tested" component={SearchTested} />
                            <Route path="/search/exposed" component={SearchExposed} />
                            <Route path="/chat/:id?" component={Chat} />
                            <Route path="/settings/:setting?" component={Settings} />
                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </div>
                </LoggedIn>
            </Body>
        </Providers>
    );
};



export default App;


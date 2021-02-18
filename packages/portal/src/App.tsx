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
import About from './components/About';
import Admin from './components/Admin';
import { NotLoggedIn, LoggedIn } from './components/Login/LoginStatusSwitch';


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
                    <Menu />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/search/tested" component={SearchTested} />
                        <Route path="/search/exposed" component={SearchExposed} />
                        <Route path="/chat/:id?" component={Chat} />
                        <Route path="/about" component={About} />
                        <Route path="/admin" component={Admin} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </LoggedIn>
            </Body>
        </Providers>
    );
};



export default App;


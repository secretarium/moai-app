import React, { useEffect, useState, StrictMode } from 'react';
import { withState } from './store';
import { Route, Switch } from 'react-router-dom';
import Providers from './Providers';
import Login from './components/Login';
import Chat from './components/Chat';
import Body from './components/Body';
import { generateLocalKey } from './actions/secretarium';


const App = withState()(
    (s) => ({
        localKey: s.system.localKey
    }),
    ({ dispatch, localKey }) => {

        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);

        useEffect(() => {
            if (!localKey && !hasRequestedLocalKey) {
                dispatch(generateLocalKey()).then(() => {
                    setHasRequestedLocalKey(true);
                });
            } else {
                setHasRequestedLocalKey(true);
            }
        }, [dispatch, hasRequestedLocalKey, localKey]);

        return (
            <StrictMode>
                <Providers>
                    <Body>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/chat" component={Chat} />
                        </Switch>
                    </Body>
                </Providers>
            </StrictMode>
        );
    }
);


export default App;


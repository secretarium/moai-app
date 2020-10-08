// import React, { useEffect, useState } from 'react';
// import { withState } from './store';
// import { Route, Switch } from 'react-router-dom';
// import Providers from './Providers';
// import Login from './components/Login';
// import Home from './components/Home';
// import { generateLocalKey } from './actions/secretarium';

// const App = withState()(
//     (s) => ({
//         localKey: s.system.localKey
//     }),
//     ({ dispatch, localKey }) => {

//         const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);

//         useEffect(() => {
//             if (!localKey && !hasRequestedLocalKey) {
//                 dispatch(generateLocalKey()).then(() => {
//                     setHasRequestedLocalKey(true);
//                 });
//             } else {
//                 setHasRequestedLocalKey(true);
//             }
//         }, [dispatch, hasRequestedLocalKey, localKey])

//         return (
//             <Providers>
//                 <Switch>
//                     <Route exact path="/" component={Home} />
//                     <Route path="/login" component={Login} />
//                 </Switch>
//             </Providers>
//         );
//     }
// );


// export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Providers from './Providers';
import Chat from './components/Chat';
import Body from './components/Body';

const App: React.FC = () => (
    <Providers>
        <Body>
            <Switch>
                <Route exact path="/" component={Chat} />
            </Switch>
        </Body>
    </Providers>
);


export default App;

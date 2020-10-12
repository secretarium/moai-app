import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const Providers: React.FC = ({ children }) => (
    <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                {children}
            </Router>
        </PersistGate>
    </ReduxProvider>
);


export default Providers;
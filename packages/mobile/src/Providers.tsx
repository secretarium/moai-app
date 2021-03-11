import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from './ReactRouter';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Connector from './Connector';
import secretariumHandler from './utils/secretariumHandler';

secretariumHandler.initialize();

const Providers: React.FC = ({ children }) => (
    <AppearanceProvider>
        <ReduxProvider store={store}>
            <Connector>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>{children}</Router>
                </PersistGate>
            </Connector>
        </ReduxProvider>
    </AppearanceProvider>
);


export default Providers;

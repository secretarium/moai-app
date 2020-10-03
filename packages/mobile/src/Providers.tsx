import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from './ReactRouter';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import FontLoader from './FontLoader';

const Providers: React.FC = ({ children }) => (
    <AppearanceProvider>
        <FontLoader>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>{children}</Router>
                </PersistGate>
            </ReduxProvider>
        </FontLoader>
    </AppearanceProvider>
);


export default Providers;

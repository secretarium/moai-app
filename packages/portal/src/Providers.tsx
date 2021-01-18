import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import secretariumHandler from './utils/secretariumHandler';
import { I18nextProvider } from 'react-i18next';
import i18n from './services/i18n/i18n';


secretariumHandler.initialize();

const Providers: React.FC = ({ children }) => (
    <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    {children}
                </Router>
            </PersistGate>
        </ReduxProvider>
    </I18nextProvider>
);


export default Providers;
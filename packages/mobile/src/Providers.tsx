import { FC, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Connector from './Connector';
import secretariumHandler from './utils/secretariumHandler';

secretariumHandler.initialize();

const Providers: FC<PropsWithChildren> = ({ children }) => (
    <ReduxProvider store={store}>
        <Connector>
            <PersistGate loading={null} persistor={persistor}>
                <NativeRouter>{children}</NativeRouter>
            </PersistGate>
        </Connector>
    </ReduxProvider>
);


export default Providers;

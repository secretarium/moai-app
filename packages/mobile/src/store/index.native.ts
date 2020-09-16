import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';

// Persistence layer configuration
const persistConfig = {
    key: 'moai',
    storage: AsyncStorage,
    version: 0,
    migrate: (state) => {
        console.log('Migration running...');
        return Promise.resolve(state);
    }
};

// Middlewares
const middlewares = [thunk, createLogger()];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export { store, persistor };
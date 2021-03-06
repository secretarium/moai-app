import { createStore, applyMiddleware } from 'redux';
import { connect, useSelector as useSelectorBase } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { fromJS, Record as ImmutableRecord } from 'immutable';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import dispatchMiddleware from './dispatchMiddleware';

const persistConfig = {
    key: 'moai-portal',
    storage: storage,
    version: 0,
    migrate: (state) => {
        return Promise.resolve(state);
    }
};

const isDev = process.env.NODE_ENV === 'development';
const middlewares = isDev ? [dispatchMiddleware, createLogger({
    collapsed: true,
    stateTransformer: state => (state?.toJS ? state.toJS() : state)
})] : [dispatchMiddleware];
const persistedReducer = persistReducer(persistConfig, rootReducer);
const immutableStateReducer = (state: any, ownProps: any) => fromJS(persistedReducer(state?.toJS ? state.toJS() : state, ownProps));

const store = createStore(immutableStateReducer, composeWithDevTools(applyMiddleware(...middlewares)));
const persistor = persistStore(store);
const withState: MoaiPortal.StateCurry<typeof rootReducer> = () => (propsMapper, component) => {

    const connector = connect(
        (state: any, ownProps: any) => ({
            ...(propsMapper ? state.toJS ? propsMapper(state.toJS(), ownProps) : propsMapper(state, ownProps) : {}),
            ...ownProps
        })
    );

    return connector(component as React.FC);
};

// const useSelector: Moai.StateSelector = (stateTransform) => useSelectorBase((state: any) => state?.toJS ? stateTransform(state?.toJS()) : stateTransform(state));
const useSelector: MoaiPortal.StateSelector = (selector, equalityFn) => useSelectorBase<ImmutableRecord<MoaiPortal.State>, any>((state) => selector(state?.toJS()), equalityFn);

export {
    store,
    persistor,
    withState,
    useSelector
};
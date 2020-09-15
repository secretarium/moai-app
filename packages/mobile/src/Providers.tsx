import React from "react";
import { Provider } from "react-redux";
import { Router } from "./ReactRouter";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const Providers: React.FC = ({ children }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>{children}</Router>
        </PersistGate>
    </Provider>
);

export default Providers;

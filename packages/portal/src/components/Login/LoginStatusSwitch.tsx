import React from 'react';
import { withState } from '../../store';


export const NotLoggedIn = withState()((s) => ({
    isConnected: s.tracer.isConnected
}), ({ children, isConnected }) => {
    if (isConnected)
        return null;
    else
        return <>{children}</>;
});

export const LoggedIn = withState()((s) => ({
    isConnected: s.tracer.isConnected
}), ({ children, isConnected }) => {
    if (isConnected)
        return <>{children}</>;
    else
        return null;
});
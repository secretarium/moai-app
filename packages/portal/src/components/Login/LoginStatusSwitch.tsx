import React, { useState } from 'react';

export const NotLoggedIn: React.FC = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);
    if (isConnected)
        return null;
    else
        return <>{children}</>;
};

export const LoggedIn: React.FC = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);
    if (isConnected)
        return <>{children}</>;
    else
        return null;
};
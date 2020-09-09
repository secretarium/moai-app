import React from 'react';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

export const DesktopOrTablet: React.FC = ({ children }) => {
    const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });
    return isDesktopOrTablet ? <>{children} </> : null;
};

export const Mobile: React.FC = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? <>{children} </> : null;
};

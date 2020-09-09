import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

export const DesktopOrTablet = ({ children }) => {
    const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });
    return isDesktopOrTablet ? children : null;
};

export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
};

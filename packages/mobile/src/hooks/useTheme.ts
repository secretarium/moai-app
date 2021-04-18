import { StatusBarStyle } from 'react-native';
import { ColorSchemeName, useColorScheme } from 'react-native-appearance';

type Colors = {
    modalBackground: string;
    modalText: string;
    icon: string;
    button: string;
    text: string;
    input: string;
    background: string;
    statusBar: StatusBarStyle;
};

const palette = {
    black: '#000000',
    white: '#FFFFFF',
    nero: '#1B1B1B',
    lightGray: '#D3D3D3',
    darkGray: '#404040',
    gray: '#888888',
    light: 'light-content',
    dark: 'dark-content'
};

const colors: Colors = {
    modalBackground: palette.lightGray,
    modalText: palette.black,
    icon: palette.lightGray,
    button: palette.lightGray,
    text: palette.black,
    input: palette.white,
    background: palette.white,
    statusBar: palette.dark as StatusBarStyle
};

const themedColors = {
    default: {
        ...colors
    },
    light: {
        ...colors
    },
    dark: {
        ...colors,
        modalBackground: palette.darkGray,
        modalText: palette.white,
        icon: palette.gray,
        button: palette.darkGray,
        text: palette.white,
        input: palette.nero,
        background: palette.nero,
        statusBar: palette.light as StatusBarStyle
    }
};

export const useTheme = (): { colors: Colors, theme: ColorSchemeName } => {
    const theme = useColorScheme();
    const colors = theme ? themedColors[theme] : themedColors.default;
    return {
        colors,
        theme
    };
};
